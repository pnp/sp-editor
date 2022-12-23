import * as SP from '@pnp/sp/presets/all'
import * as Logging from '@pnp/logging'
import * as Queryable from '@pnp/queryable'
import { ISPShootPayload } from '../../../store/spshoot/types'
import { spPost, Web } from '@pnp/sp/presets/all'
import { HttpRequestError } from '@pnp/queryable'

// we cannot use async methods, they do not work correctly when running 'npm run build',
// async methods works when running 'npm run watch'
export function shoot(...args: any) {
  /* get parameters */
  const params = args
  const functionName = params[0].name
  const payload: ISPShootPayload = JSON.parse(
    decodeURIComponent(params[1]).replace(/%27/g, "'"),
  );

  /* import pnp */
  type libTypes = [Promise<typeof SP>, Promise<typeof Logging>, Promise<typeof Queryable>];

  Promise.all<libTypes>([
    (window as any).SystemJS.import((window as any).mod_sp),
    (window as any).SystemJS.import((window as any).mod_logging),
    (window as any).SystemJS.import((window as any).mod_queryable)
  ]).then((modules) => {

    var pnpsp = modules[0]
    var pnplogging = modules[1]
    var pnpqueryable = modules[2]

    function rawFetchHandler() {
      return (instance) => {
        instance.using(
          pnpsp.DefaultHeaders(),
          pnpsp.DefaultInit(),
          pnpqueryable.BrowserFetchWithRetry(),
          pnpqueryable.DefaultParse(),
          pnpsp.RequestDigest());

        instance.on.pre.prepend((url, init, result) => {

          if (url.indexOf('###') > -1) {
            return [url.substring(url.indexOf("###") + 3), init, result];
          }

          return [url, init, result];
        });
        return instance;
      };
    }

    const sp = pnpsp.spfi().using(pnpsp.SPBrowser({ baseUrl: (window as any)._spPageContextInfo.webAbsoluteUrl }))
      .using(rawFetchHandler())
      .using(pnpqueryable.InjectHeaders({
        "Accept": "application/json; odata=verbose",
        "Cache-Control": "no-cache",
        "X-ClientService-ClientTag": "SPEDITOR"
      }));

    /*** clear previous log listeners ***/
    pnplogging.Logger.clearSubscribers()
    /*** setup log listener ***/
    const listener = pnplogging.FunctionListener((entry) => {
      entry.data.response
        .clone()
        .json()
        .then((error: any) => {
          window.postMessage(
            JSON.stringify({
              function: functionName,
              success: false,
              result: null,
              errorMessage: error.error.message.value,
              source: 'chrome-sp-editor',
            }),
            '*',
          )
        })
    })
    pnplogging.Logger.subscribe(listener)
    /* *** */

    const postMessage = (actions: any) => {
      window.postMessage(
        JSON.stringify({
          function: functionName,
          success: true,
          result: actions,
          errorMessage: '',
          source: 'chrome-sp-editor',
        }),
        '*',
      )
    }

    try {
      JSON.parse(payload.headers)
    } catch (ex) {
      window.postMessage(
        JSON.stringify({
          function: functionName,
          success: false,
          result: null,
          errorMessage:
            'Could not parse request headers!: ' + payload.headers,
          source: 'chrome-sp-editor',
        }),
        '*',
      )
      return
    }

    pnpsp.spPost(pnpsp.Web(sp.web, "###" + payload.path), {
      headers: JSON.parse(payload.headers),
      method: payload.method,
      body: payload.method === 'GET' ? null : payload.body,
    })
      .then((json) => {
        if (json.status === 204) {
          postMessage(JSON.stringify(json))
        } else {
          if (json && json['odata.error']) {
            const errori = json['odata.error'].message.value
            window.postMessage(
              JSON.stringify({
                function: functionName,
                success: false,
                result: null,
                errorMessage: errori.length > 300 ? errori.substring(0, 299) : errori,
                source: 'chrome-sp-editor',
              }),
              '*',
            )
          } else {
            postMessage(json)
          }
        }
      })
      .catch((error) => {
        var errorMessage = error.message;
        if (error?.isHttpRequestError) {

          // we can read the json from the response
          const json = (<HttpRequestError>error).response.json().then(json => {

            // if we have a value property we can show it
            errorMessage = typeof json["odata.error"] === "object" ? json["odata.error"].message.value : error.message
          })
        } else {
          // not an HttpRequestError so we just log message
          console.log(error);
        }

        window.postMessage(
          JSON.stringify({
            function: functionName,
            success: false,
            result: null,
            errorMessage: errorMessage,
            source: 'chrome-sp-editor',
          }),
          '*',
        )
      })
  },
  )
}
