import * as SP from '@pnp/sp/presets/all'
import * as Logging from '@pnp/logging'
import * as Queryable from '@pnp/queryable'

export const shoot = (payload: any, extPath: string) => {

  return moduleLoader(extPath).then((modules) => {

    /*** map modules ***/
    var pnpsp = modules[0];
    var pnplogging = modules[1];
    var pnpqueryable = modules[2];

    let digest: string = '';

    /*** custom httpHandler ***/
    const rawFetchHandler = (props?: any) => {
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
              const index = url.indexOf('###');
              let extractedPart: string;

              if (index !== -1) {
                extractedPart = url.substring(index + 3);
              } else {
                extractedPart = url;
              }
              const modifiedUrl = extractedPart.replace(/_api.*|_vti_.*/g, '');
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

           // aking HttpClient request in queryable [400] Bad Request ::> {"error":{"code":"-1, Microsoft.Data.OData.ODataException","message":{"lang":"en-US","value":"The specified content type 'application/json;odata=verbose, application/json;charset=utf-8' contains either no media type or more than one media type, which is not allowed. You must specify exactly one media type as the content type."}}}

            init.headers = {
              'X-RequestDigest': digest,
              ...init.headers,
            };
          }

          if (url.indexOf('###') > -1) {
            return [url.substring(url.indexOf('###') + 3), init, result];
          } 

          return [url, init, result];
        });
        return instance;
      };
    }

    /***  init pnpjs ***/
    const sp = pnpsp.spfi().using(rawFetchHandler({ baseUrl: (window as any)._spPageContextInfo.webAbsoluteUrl })).using(pnpqueryable.InjectHeaders({
      "Accept": "application/json; odata=verbose",
      "Cache-Control": "no-cache",
      "X-ClientService-ClientTag": "SPEDITOR"
    }));

    /*** clear previous log listeners ***/
    pnplogging.Logger.clearSubscribers();

    /*** setup log listener ***/
    const listener = pnplogging.FunctionListener(entry => {
      entry.data.response.clone().json().then((error: any) => {
        return {
          success: false,
          result: null,
          errorMessage: error.error.message.value,
          source: 'chrome-sp-editor'
        }
      });
    });
    pnplogging.Logger.subscribe(listener);

    /*** check that headers valid object ***/
    try {
      JSON.parse(payload.headers);
    } catch (ex) {
      return {
        success: false,
        result: null,
        errorMessage: 'Could not parse request headers!: ' + payload.headers,
        source: 'chrome-sp-editor'
      }
    }

    const headers = JSON.parse(payload.headers);

    // Capitalize the first letter of each header key
    const capitalizedHeaders = Object.keys(headers).reduce((acc, key) => {
      const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
      acc[capitalizedKey] = headers[key];
      return acc;
    }, {} as { [key: string]: string });

    /*** execute request, add ### to trigger custom httpHandler ***/
    return pnpsp.spPost(pnpsp.Web(sp.web, "###" + payload.path), {
      headers: capitalizedHeaders,
      method: payload.method,
      body: payload.method === 'GET' ? null : payload.body
    }).then(json => {
      if (json.status === 204) {
        return json;
      } else {
        if (json && json['odata.error']) {
          const errori = json['odata.error'].message.value;
          return {
            success: false,
            result: null,
            errorMessage: errori.length > 300 ? errori.substring(0, 299) : errori,
            source: 'chrome-sp-editor'
          }
        } else {
          return json
        }
      }
    }).catch(error => {
      var errorMessage = error.message;
      if (error !== null && error !== void 0 && error.isHttpRequestError) {
        // we can read the json from the response
        error.response.json().then((json: any) => {
          // if we have a value property we can show it
          errorMessage = typeof json["odata.error"] === "object" ? json["odata.error"].message.value : error.message;
        });
      } else {
        // not an HttpRequestError so we just log message
        //console.log(error);
      }
      return {
        success: false,
        result: null,
        errorMessage: errorMessage,
        source: 'chrome-sp-editor'
      }
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
          (window as any).SystemJS.import(extPath + 'bundles/queryable.es5.umd.bundle.js')])
          .then((modules) => {
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

}