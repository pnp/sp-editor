import { ILogEntry } from '@pnp/logging'
import * as pnp from '@pnp/pnpjs'

// we cannot use async methods, they do not work correctly when running 'npm run build',
// async methods works when running 'npm run watch'
export function getFiles(...args: any) {

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

    const postMessage = (actions: any[]) => {
      window.postMessage(JSON.stringify({
        function: functionName,
        success: true,
        result: actions,
        errorMessage: '',
        source: 'chrome-sp-editor',
      }), '*')
    }

    // get site custom actions
    $pnp.sp.web.expand('Webs, Folders, RootFolder/Files')
    .select('Id, Webs/Id, Webs/Title, Webs/ServerRelativeUrl, Folders/Name, Folders/UniqueId, Folders/ServerRelativeUrl, RootFolder/Files/ServerRelativeUrl, RootFolder/Files/Name, RootFolder/Files/Id, RootFolder/Files/CustomizedPageStatus').get().then((r: any) => {
      const joined: any[] = []

      console.log(r)
      r.Folders.results.forEach(function (folder: any, ind: number) {
        joined.push({
          id: folder.UniqueId,
          parent: 0,
          text: folder.Name,
          droppable: true,
        })
      })
     /* r.RootFolder.Files.results.forEach(function (file: any) {
        joined.push({ Id: file.Id, webId: r.Id, label: file.Name, ServerRelativeUrl: file.ServerRelativeUrl, CustomizedPageStatus: file.CustomizedPageStatus })
      })
      r.Webs.results.forEach(function (web: any) {
        joined.push({ webId: web.Id, label: web.Title, ServerRelativeUrl: web.ServerRelativeUrl, web: true, expanded: false })
      })*/
      postMessage(joined)
      // window.postMessage(JSON.stringify({ function: requestor, success: true, result: joined, source: 'chrome-sp-editor' }), '*')
    })
  })

}
