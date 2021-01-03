import { ILogEntry } from '@pnp/logging'
import * as pnp from '@pnp/pnpjs'

// we cannot use async methods, they do not work correctly when running 'npm run build',
// async methods works when running 'npm run watch'
export function updateSubscription(...args: any) {

  /* get parameters */
  const params = args
  const functionName = params[0].name

  const listId = params[1] ?? ''
  const hookUrl = params[2] ?? ''
  let clientstate = params[3]
  const expirationDate = params[4] ?? ''
  const subscriptionId = params[5] ?? '';

  /* import pnp */
  (window as any).SystemJS.import(((window as any).speditorpnp)).then(($pnp: typeof pnp) => {
    /*** setup pnp ***/
    $pnp.setup({
      sp: {
        headers: {
          Accept: 'application/json; odata=verbose',
          'Cache-Control': 'no-cache',
          'X-ClientService-ClientTag': 'SPEDITOR',
        },
      },
    })
    /*** clear previous log listeners ***/
    $pnp.log.clearSubscribers()
    /*** setup log listener ***/
    const listener = new $pnp.FunctionListener((entry: ILogEntry) => {
      entry.data.response.clone().json().then((error: any) => {
        window.postMessage(JSON.stringify({
          function: functionName,
          success: false,
          result: null,
          errorMessage: error.error.message.value,
          source: 'chrome-sp-editor',
        }), '*')
      })
    })
    $pnp.log.subscribe(listener)
    /* *** */

    const postMessage = () => {
      window.postMessage(JSON.stringify({
        function: functionName,
        success: true,
        result: [],
        errorMessage: '',
        source: 'chrome-sp-editor',
      }), '*')
    }

    if (clientstate === null || clientstate === undefined || clientstate!.length === 0) {
      clientstate = ' '
    }

    $pnp.sp.web.lists.getById(listId).subscriptions.getById(subscriptionId)
      .update(expirationDate, hookUrl, clientstate)
      .then(postMessage)

  })
}
