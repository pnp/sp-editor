import * as SP from '@pnp/sp/presets/all';
import * as Logging from '@pnp/logging';
import * as Queryable from '@pnp/queryable';

export const getTenantProperties = (extPath: string) => {
  return moduleLoader(extPath).then((modules) => {
    /*** map modules ***/
    var pnpsp = modules[0];
    var pnplogging = modules[1];
    var pnpqueryable = modules[2];

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

    /***  init pnpjs ***/
    const sp = pnpsp
      .spfi()
      .using(SPEditor({ baseUrl: (window as any)._spPageContextInfo.webAbsoluteUrl }))
      .using(
        pnpqueryable.InjectHeaders({
          Accept: 'application/json; odata=verbose',
          'Cache-Control': 'no-cache',
          'X-ClientService-ClientTag': 'SPEDITOR',
        })
      );

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

    /*** execute request, add ### to trigger custom httpHandler ***/
    return sp
      .getTenantAppCatalogWeb()
      .then((appcatalogWeb) => appcatalogWeb.allProperties.select('storageentitiesindex')())
      .then((result) => {
        const compare = (a: any, b: any) => {
          return a.key.toLowerCase() < b.key.toLowerCase() ? -1 : a.key.toLowerCase() > b.key.toLowerCase() ? 1 : 0;
        };

        const parsedResult = JSON.parse(result?.storageentitiesindex ?? '{}');
        const allProps = Object.keys(parsedResult).map((key) => ({
          key,
          value: parsedResult[key].Value,
          comment: parsedResult[key].Comment,
          description: parsedResult[key].Description,
        }));
        allProps.sort(compare);
        return allProps;
      })
      .catch((error) => {
        var errorMessage = error.message;
        if (error !== null && error !== void 0 && error.isHttpRequestError) {
          // we can read the json from the response
          error.response.json().then((json: any) => {
            // if we have a value property we can show it
            errorMessage = typeof json['odata.error'] === 'object' ? json['odata.error'].message.value : error.message;
          });
        } else {
          // not an HttpRequestError so we just log message
          //console.log(error);
        }
        return {
          success: false,
          result: null,
          errorMessage: errorMessage,
          source: 'chrome-sp-editor',
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
