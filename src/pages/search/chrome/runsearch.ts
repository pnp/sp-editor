import * as SP from '@pnp/sp/presets/all';
import * as Logging from '@pnp/logging';
import * as Queryable from '@pnp/queryable';

export const runsearch = (payload: SP.ISearchQuery, extPath: string) => {
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

    const removeEmptyArraysAndWrap = (payload: any) => {
      const isNotSPO = !(window as any)._spPageContextInfo.isSPO;
    
      for (const key in payload) {
        if (Array.isArray(payload[key])) {
          if (payload[key].length === 0) {
            delete payload[key];
          } else if (isNotSPO) {
            payload[key] = { results: payload[key] };
          }
        }
      }
      return payload;
    };
    
    const ensureSelectProperties = (payload: any) => {
      if (Array.isArray(payload.SelectProperties)) {
        const requiredProperties = ['Title', 'OriginalPath', 'DocId'];
        requiredProperties.forEach((prop) => {
          if (!payload.SelectProperties.includes(prop)) {
            payload.SelectProperties.push(prop);
          }
        });
      }
      return payload;
    };
    
    ensureSelectProperties(payload);
    removeEmptyArraysAndWrap(payload);
    
    let digest: string = '';

    const SPEditor = (props?: SP.ISPBrowserProps) => {
      return (instance: Queryable.Queryable) => {
        instance.using(
          pnpsp.DefaultHeaders(),
          pnpsp.DefaultInit(),
          pnpqueryable.BrowserFetchWithRetry(),
          pnpqueryable.DefaultParse()
        );

        instance.on.pre.prepend(async (url, init, result) => {
          url = props?.baseUrl
            ? new URL(url, props.baseUrl.endsWith('/') ? props.baseUrl : props.baseUrl + '/').toString()
            : url;

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

    return pnpsp.spPost(pnpsp.Web(sp.web, `/_api/search/postquery`), { body: JSON.stringify({request: payload }) })
      .then((r) => {
        const parsedResults = formatSearchResults(r.postquery.PrimaryQueryResult?.RelevantResults?.Table?.Rows);
        var result = {
          ElapsedTime: r.postquery.ElapsedTime,
          PrimarySearchResults: parsedResults,
          RowCount: r.postquery.PrimaryQueryResult?.RelevantResults?.RowCount,
          TotalRows: r.postquery.PrimaryQueryResult?.RelevantResults?.TotalRows,
          TotalRowsIncludingDuplicates: r.postquery.PrimaryQueryResult?.RelevantResults?.TotalRowsIncludingDuplicates,
        };
        return result;
      })
      .catch((error) => {
        var errorMessage = error.message;
        if (error !== null && error !== void 0 && error.isHttpRequestError) {
          // we can read the json from the response
          return error.response.json().then((json: any) => {
            // if we have a value property we can show it
            errorMessage = typeof json['odata.error'] === 'object' ? json['odata.error'].message.value : error.message;
            return {
              errorMessage: errorMessage,
            };
          });
        } else
          return {
            errorMessage: errorMessage,
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
