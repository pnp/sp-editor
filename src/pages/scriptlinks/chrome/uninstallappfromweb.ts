import { ILogEntry } from '@pnp/logging'
import * as pnp from '@pnp/pnpjs'

// we cannot use async methods, they do not work correctly when running 'npm run build',
// async methods works when running 'npm run watch'
export function unInstallAppFromWeb(...args: any) {

  /* get parameters */
  const params = args
  const functionName = params[0].name;

  /* import pnp */
  (window as any).SystemJS.import(((window as any).speditorpnp)).then(($pnp: typeof pnp) => {
    /*** setup pnp ***/
    $pnp.setup({
      sp: {
        headers: {
          Accept: 'application/json; odata=verbose',
          'Cache-Control': 'no-cache',
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

    const postMessage = (actions: any) => {
      window.postMessage(JSON.stringify({
        function: functionName,
        success: true,
        result: actions,
        errorMessage: '',
        source: 'chrome-sp-editor',
      }), '*')
    }
    const spScriptLinksAppId = '5a2f0e0f-2f29-4e49-9351-73495827a6f3'

    const catalog = $pnp.sp.web.getAppCatalog()
    catalog.getAppById(spScriptLinksAppId).uninstall().then(() => postMessage('App removed'))

  })

}
