import * as SP from '@pnp/sp/presets/all';
import * as Logging from '@pnp/logging';
import * as Queryable from '@pnp/queryable';

export const allprops = (content: any, SourceId: any, extPath: string) => {
  return moduleLoader(extPath).then((modules) => {
    /*** map modules ***/
    var pnpsp = modules[0];
    var pnplogging = modules[1];
    var pnpqueryable = modules[2];

    // if we are in a modern page we need to get the _spPageContextInfo from the module loader
    if (!(window as any)._spPageContextInfo && (window as any).moduleLoaderPromise) {
      (window as any).moduleLoaderPromise.then((e: any) => {
        (window as any)._spPageContextInfo = e.context._pageContext._legacyPageContext;
      });
    }
    let digest: string = '';

    const SPEditor = (props?: SP.ISPBrowserProps) => {

      return (instance: Queryable.Queryable) => {
        instance.using(
          pnpsp.DefaultHeaders(),
          pnpsp.DefaultInit(),
          pnpqueryable.BrowserFetchWithRetry(),
          pnpqueryable.DefaultParse(),
        );

        instance.on.pre.prepend(async (url, init, result) => {
          url = props?.baseUrl ? new URL(url, props.baseUrl.endsWith('/') ? props.baseUrl : props.baseUrl + '/').toString() : url;

          if (['POST', 'PATCH', 'PUT', 'DELETE', 'MERGE'].includes(init.method ?? '')) {
            if (!digest) {
              const modifiedUrl = url.toString().replace(/_api.*|_vti_.*/g, '');
              const response = await fetch(`${modifiedUrl}_api/contextinfo`, {
                method: 'POST',
                headers: {
                  accept: 'application/json;odata=verbose',
                  'content-type': 'application/json;odata=verbose',
                },
              });
              const data = await response.json();
              digest = data.d.GetContextWebInformation.FormDigestValue;
            }
          
            init.headers = {
              'X-RequestDigest': digest,
              ...init.headers,
            };
          }

          return [
            url
              .replace('getFileByServerRelativePath(decodedUrl=', 'getFileByServerRelativeUrl(')
              .replace('getFolderByServerRelativePath(decodedUrl=', 'getFolderByServerRelativeUrl('),
            init,
            result,
          ];
        });
        return instance;
      };
    };

    const headers: { [key: string]: string } = {
      'Accept': 'application/json;odata=verbose',
      'Cache-Control': 'no-cache',
      'X-ClientService-ClientTag': 'SPEDITOR',
    };

    if (!(window as any)._spPageContextInfo.isSPO) {
      headers['Content-Type'] = 'application/json;odata=verbose';
    }

    /***  init pnpjs ***/
    const sp = pnpsp
      .spfi()
      .using(SPEditor({ baseUrl: (window as any)._spPageContextInfo.webAbsoluteUrl }))
      .using(pnpqueryable.InjectHeaders(headers));

    /*** clear previous log listeners ***/
    pnplogging.Logger.clearSubscribers();

    /*** setup log listener ***/
    const listener = pnplogging.FunctionListener((entry) => {
      entry.data.response
        .clone()
        .json()
        .then((error: any) => {
          return {
            success: false,
            result: null,
            errorMessage: error.error.message.value,
            source: 'chrome-sp-editor',
          };
        });
    });

    pnplogging.Logger.subscribe(listener);

    const formatSearchResults = (rawResults: any): SP.ISearchResult[] => {

      const results = new Array<SP.ISearchResult>();

      if (typeof (rawResults) === "undefined" || rawResults == null) {
          return [];
      }

      const tempResults = rawResults.results ? rawResults.results : rawResults;

      for (const tempResult of tempResults) {

          const cells: { Key: string; Value: any }[] = tempResult.Cells.results ? tempResult.Cells.results : tempResult.Cells;

          results.push(cells.reduce((res, cell) => {
              // @ts-ignore
              res[cell.Key] = cell.Value;

              return res;

          }, {}));
      }

      return results;
  }

    var opts = {
      Querytext: `WorkId:${content}`,
      RowLimit: 1,
      Refiners: 'managedproperties(filter=600/0/*)',
    } as any;

    if (SourceId && SourceId.length > 0) {
      opts.SourceId = SourceId;
    }
    return pnpsp
      .spPost(pnpsp.Web(sp.web, `/_api/search/postquery`), { body: JSON.stringify({ request: opts }) })
      .then((r1: any) => {
        const entries = r1.postquery.PrimaryQueryResult.RefinementResults.Refiners.results[0].Entries.results;
        const allProps = entries.map((entry: any) => entry.RefinementName);

        const filteredProps = allProps.filter(
          (value: any) =>
            value !== 'ClassificationLastScan' &&
            value !== 'ClassificationCount' &&
            value !== 'ClassificationConfidence'
        );
        const isNotSPO = !(window as any)._spPageContextInfo.isSPO;

        opts.SelectProperties = isNotSPO ? { results: filteredProps } : filteredProps;

        return pnpsp.spPost(pnpsp.Web(sp.web, `/_api/search/postquery`), { body: JSON.stringify({ request: opts }) })
        .then((r: any) => {
          const parsedResults = formatSearchResults(
            r.postquery.PrimaryQueryResult?.RelevantResults?.Table?.Rows
          );
          var result = {
            ElapsedTime: r.postquery.ElapsedTime,
            PrimarySearchResults: parsedResults,
            RowCount: r.postquery.PrimaryQueryResult?.RelevantResults?.RowCount,
            TotalRows: r.postquery.PrimaryQueryResult?.RelevantResults?.TotalRows,
            TotalRowsIncludingDuplicates:
              r.postquery.PrimaryQueryResult?.RelevantResults?.TotalRowsIncludingDuplicates,
          };
          return result;
        });
      })
      .catch((error) => {
        return {
          success: false,
          result: null,
          errorMessage: error.message,
        };
      });
  });

  function moduleLoader(extPath: string) {
    type libTypes = [typeof SP, typeof Logging, typeof Queryable];
    /*** load systemjs ***/
    return new Promise<libTypes>((resolve) => {
      const s = document.createElement('script');
      s.src = extPath + 'bundles/system.js';
      (document.head || document.documentElement).appendChild(s);
      s.onload = () =>
        /*** load pnpjs modules ***/
        Promise.all<libTypes>([
          (window as any).SystemJS.import(extPath + 'bundles/sp.es5.umd.bundle.js'),
          (window as any).SystemJS.import(extPath + 'bundles/logging.es5.umd.bundle.js'),
          (window as any).SystemJS.import(extPath + 'bundles/queryable.es5.umd.bundle.js'),
        ]).then((modules) => {
          // if we are in a modern page we need to get the _spPageContextInfo from the module loader
          if (!(window as any)._spPageContextInfo && (window as any).moduleLoaderPromise) {
            (window as any).moduleLoaderPromise.then((e: any) => {
              (window as any)._spPageContextInfo = e.context._pageContext._legacyPageContext;
              resolve(modules);
            });
          } else {
            resolve(modules);
          }
        });
    });
  }
};
