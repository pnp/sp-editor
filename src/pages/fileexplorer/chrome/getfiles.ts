import * as SP from '@pnp/sp/presets/all'
import * as Logging from '@pnp/logging'
import * as Queryable from '@pnp/queryable'

// we cannot use async methods, they do not work correctly when running 'npm run build',
// async methods works when running 'npm run watch'
export function getFiles(...args: any) {

  /* get parameters */
  const params = args
  const functionName = params[0].name;

  /* import pnp */
  type libTypes = [Promise<typeof SP>, Promise<typeof Logging>, Promise<typeof Queryable>];

  Promise.all<libTypes>([
    (window as any).SystemJS.import((window as any).mod_sp),
    (window as any).SystemJS.import((window as any).mod_logging),
    (window as any).SystemJS.import((window as any).mod_queryable)
  ]).then(([pnpsp, pnplogging, pnpqueryable]) => {

    const sp = pnpsp.spfi().using(pnpsp.SPBrowser({ baseUrl: (window as any)._spPageContextInfo.webAbsoluteUrl }))
      .using(pnpqueryable.InjectHeaders({
        "Accept": "application/json; odata=verbose",
        "Cache-Control": "no-cache",
        "X-ClientService-ClientTag": "SPEDITOR"
      }));

    /*** clear previous log listeners ***/
    pnplogging.Logger.clearSubscribers()
    /*** setup log listener ***/
    const listener = pnplogging.FunctionListener((entry) => {
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
    pnplogging.Logger.subscribe(listener)
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
    sp.web.expand('Webs, Folders, RootFolder/Files')
    .select('Id, Webs/Id, Webs/Title, Webs/ServerRelativeUrl, Folders/Name, Folders/UniqueId, Folders/ServerRelativeUrl, RootFolder/Files/ServerRelativeUrl, RootFolder/Files/Name, RootFolder/Files/Id, RootFolder/Files/CustomizedPageStatus')().then((r: any) => {
      const joined: any[] = []

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
