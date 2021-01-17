import { ILogEntry } from '@pnp/logging'
import * as pnp from '@pnp/pnpjs'
import { ISPShootPayload } from '../../../store/spshoot/types'

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
  (window as any).SystemJS.import((window as any).speditorpnp).then(
    ($pnp: typeof pnp) => {
      /*** setup pnp ***/
      $pnp.setup({
        sp: {},
      })
      /*** clear previous log listeners ***/
      $pnp.log.clearSubscribers()
      /*** setup log listener ***/
      const listener = new $pnp.FunctionListener((entry: ILogEntry) => {
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
      $pnp.log.subscribe(listener)
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

      const client = new $pnp.SPNS.SPHttpClient($pnp.DefaultRuntime)
      client
        .fetch(payload.path, {
          headers: JSON.parse(payload.headers),
          method: payload.method,
          body: payload.method === 'GET' ? null : payload.body,
        })
        .then((response) => {
          if (response.status === 204) {
            postMessage(JSON.stringify(response))
          } else {
            response
              .clone()
              .json()
              .then((json) => {
                if (json && json['odata.error']) {
                  const errori = json['odata.error'].message.value
                  window.postMessage(
                    JSON.stringify({
                      function: functionName,
                      success: false,
                      result: null,
                      errorMessage: errori,
                      source: 'chrome-sp-editor',
                    }),
                    '*',
                  )
                } else {
                  postMessage(json)
                }
              })
              .catch((error) => {
                response.text().then((text) => {
                  window.postMessage(
                    JSON.stringify({
                      function: functionName,
                      success: false,
                      result: null,
                      errorMessage: error.message,
                      source: 'chrome-sp-editor',
                    }),
                    '*',
                  )
                })
              })
          }
        })
    },
  )
}
