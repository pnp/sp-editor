import * as SP from '@pnp/sp/presets/all';
import * as Logging from '@pnp/logging';
import * as Queryable from '@pnp/queryable';

export const currentpageallprops = (extPath: string) => {
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

        instance.on.pre.prepend((url, init, result) => {
          url = props?.baseUrl ? new URL(url, props.baseUrl.endsWith('/') ? props.baseUrl : props.baseUrl + '/').toString() : url;

          const modifiedUrl = url
            .replace('getFileByServerRelativePath(decodedUrl=', 'getFileByServerRelativeUrl(')
            .replace('getFolderByServerRelativePath(decodedUrl=', 'getFolderByServerRelativeUrl(');

          if (['POST', 'PATCH', 'PUT', 'DELETE', 'MERGE'].includes(init.method ?? '')) {
            if (!digest) {
              const contextUrl = url.toString().replace(/_api.*|_vti_.*/g, '');
              return fetch(contextUrl + '_api/contextinfo', {
                method: 'POST',
                headers: {
                  accept: 'application/json;odata=verbose',
                  'content-type': 'application/json;odata=verbose',
                },
              })
              .then(function(response) { return response.json(); })
              .then(function(data) {
                digest = data.d.GetContextWebInformation.FormDigestValue;
                init.headers = Object.assign({}, { 'X-RequestDigest': digest }, init.headers);
                return [modifiedUrl, init, result];
              });
            } else {
              init.headers = Object.assign({}, { 'X-RequestDigest': digest }, init.headers);
              return Promise.resolve([modifiedUrl, init, result]);
            }
          }

          return Promise.resolve([modifiedUrl, init, result]);
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
      return entry.data.response
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

    let page = { UniqueId: '' };

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
    const isNotSPO = !(window as any)._spPageContextInfo.isSPO;

    return sp.web
      .getFileByServerRelativePath((window as any)._spPageContextInfo.serverRequestPath)
      .select('UniqueId,ContentTag')()
      .then((r) => {
          page.UniqueId = r.UniqueId || r.ContentTag.match(/{([^}]+)}/)?.[1] || '';
        
        var opts = {
          Querytext: `NormUniqueID:${page.UniqueId}`,
          RowLimit: 1,
          Refiners: 'managedproperties(filter=600/0/*)',
          SelectProperties: isNotSPO ? { results: ['WorkId'] } : ['WorkId'],
        };
        return pnpsp
          .spPost(pnpsp.Web(sp.web, `/_api/search/postquery`), { body: JSON.stringify({ request: opts }) })
          .then((r1: any) => {
            if (r1.postquery.PrimaryQueryResult?.RelevantResults?.RowCount > 0) {
              const entries = r1.postquery.PrimaryQueryResult.RefinementResults.Refiners.results[0].Entries.results;
              const allProps = entries.map((entry: any) => entry.RefinementName);

              const filteredProps = allProps.filter(
                (value: any) =>
                  value !== 'ClassificationLastScan' &&
                  value !== 'ClassificationCount' &&
                  value !== 'ClassificationConfidence'
              );

              return pnpsp
                .spPost(pnpsp.Web(sp.web, `/_api/search/postquery`), {
                  body: JSON.stringify({
                    request: {
                      Querytext: `NormUniqueID:${page.UniqueId}`,
                      RowLimit: 1,
                      SelectProperties: isNotSPO ? { results: filteredProps } : filteredProps,
                    },
                  }),
                })
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
                    RawSearchResults: r.postquery.PrimaryQueryResult,
                  };
                  return result;
                });
            } else {
              const parsedResults = formatSearchResults(r1.postquery.PrimaryQueryResult?.RelevantResults?.Table?.Rows);
              var result = {
                ElapsedTime: r1.postquery.ElapsedTime,
                PrimarySearchResults: parsedResults,
                RowCount: r1.postquery.PrimaryQueryResult?.RelevantResults?.RowCount,
                TotalRows: r1.postquery.PrimaryQueryResult?.RelevantResults?.TotalRows,
                TotalRowsIncludingDuplicates:
                  r1.postquery.PrimaryQueryResult?.RelevantResults?.TotalRowsIncludingDuplicates,
              };
              return result;
            }
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
