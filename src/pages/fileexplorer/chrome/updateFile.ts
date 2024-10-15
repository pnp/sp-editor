import * as SP from '@pnp/sp/presets/all';
import * as Logging from '@pnp/logging';
import * as Queryable from '@pnp/queryable';

export const updateFile = (extPath: string, relativeUrl: string, webId: string, content: string) => {
  return moduleLoader(extPath).then((modules) => {
    /*** map modules ***/
    var pnpsp = modules[0];
    var pnpqueryable = modules[2];

    /***  init pnpjs ***/
    const sp = pnpsp
      .spfi()
      .using(pnpsp.SPBrowser({ baseUrl: (window as any)._spPageContextInfo.webAbsoluteUrl }))
      .using(
        pnpqueryable.InjectHeaders({
          Accept: 'application/json; odata=verbose',
          'Cache-Control': 'no-cache',
          'X-ClientService-ClientTag': 'SPEDITOR',
        })
      );

    const handleError = (error: any) => {
      let errorMessage = error.message;

      if (error !== null && error !== void 0 && error.isHttpRequestError) {
        // we can read the json from the response
        return error.response.json().then((json: any) => {
          // if we have a value property we can show it
          errorMessage = json.error.message.value;
          return {
            success: false,
            result: null,
            errorMessage: errorMessage,
            source: 'chrome-sp-editor',
          };
        });
      } else {
        // not an HttpRequestError so we just log message
        return {
          success: false,
          result: null,
          errorMessage: errorMessage,
          source: 'chrome-sp-editor',
        };
      }
    };

    /*** execute request, add ### to trigger custom httpHandler ***/
    if (webId) {
      return sp.site.openWebById(webId).then((w) => {
        return w.web
          .getFileByServerRelativePath(relativeUrl)()
          .then((r) => {
            if (r.CustomizedPageStatus > 0 || relativeUrl.toLowerCase().indexOf('/forms/') > 0) {
              return w.web
                .getFileByServerRelativePath(relativeUrl)
                .setContent(content)
                .then((f) => {
                  return f;
                })
                .catch(handleError);
            } else if (r.CheckOutType === 2) {
              return w.web
                .getFileByServerRelativePath(relativeUrl)
                .checkout()
                .then((f) => {
                  return w.web
                    .getFileByServerRelativePath(relativeUrl)
                    .setContent(content)
                    .then((f) => {
                      return w.web
                        .getFileByServerRelativePath(relativeUrl)
                        .checkin('Updated from SP Editor', 0)
                        .then((f) => {
                          return f;
                        })
                        .catch(handleError);
                    })
                    .catch(handleError);
                })
                .catch(handleError);
            } else {
              return w.web
                .getFileByServerRelativePath(relativeUrl)
                .setContent(content)
                .then((f) => {
                  return w.web
                    .getFileByServerRelativePath(relativeUrl)
                    .checkin('Updated from SP Editor', 0)
                    .then((f) => {
                      return f;
                    })
                    .catch(handleError);
                })
                .catch(handleError);
            }
          })
          .catch(handleError);
      });
    }
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
