import * as SP from '@pnp/sp/presets/all'
import * as Logging from '@pnp/logging'
import * as Queryable from '@pnp/queryable'
import { IFolder } from '../../../store/fileexplorer/types';
import "@pnp/sp/folders";

// we cannot use async methods, they do not work correctly when running 'npm run build',
// async methods works when running 'npm run watch'
export function getFolders(...args: any) {

  /* get parameters */
  const params = args
  const functionName = params[0].name;

  var requestor = params[0].path;
  var webId = params[0].webid;

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

    const postMessage = (actions: IFolder) => {
      window.postMessage(JSON.stringify({
        function: functionName,
        success: true,
        result: actions,
        errorMessage: '',
        source: 'chrome-sp-editor',
      }), '*')
    }

    sp.site.openWebById(webId).then(w => {

      w.web.getFolderByServerRelativePath(requestor).expand("Folders, Files")().then((r: any) => {
        let joined: IFolder = ({
          name: "root",
          children: []
        })
console.log(r)
        r.Folders.results.forEach(function (folder: any) {
          joined.children.push({
            children: [],
            name: folder.Name,
            isBranch: true,
            id: folder.UniqueId,
          })
        })

        r.RootFolder.Files.results.forEach(function (file: any) {
          joined.children.push({
            name: file.Name, id:
            file.Id,
            isBranch: false
          })
        })
console.log(joined)
      /*  var joined = [];
        r.Folders.results.forEach(function (folder) {
          joined.push({ webId: w.data.Id, label: folder.Name, ServerRelativeUrl: folder.ServerRelativeUrl, folder: true, expanded: false });
        });
        r.Files.results.forEach(function (file) {
          joined.push({ webId: w.data.Id, label: file.Name, ServerRelativeUrl: file.ServerRelativeUrl, CustomizedPageStatus: file.CustomizedPageStatus });
        });*/
       /* postMessage({
          name: '',
          children: joined.children.sort((a, b) => a.name.localeCompare(b.name))
        });*/
      })
 
    });


    // get site custom actions
    sp.web.expand('Webs, Folders, RootFolder/Files')
      .select('Id, Webs/Id, Webs/Title, Webs/ServerRelativeUrl, Folders/Name, Folders/UniqueId, Folders/ServerRelativeUrl, RootFolder/Files/ServerRelativeUrl, RootFolder/Files/Name, RootFolder/Files/Id, RootFolder/Files/CustomizedPageStatus')().then((r: any) => {
        let joined: IFolder = ({
          name: "root",
          children: []
        })

        r.Folders.results.forEach(function (folder: any) {
          joined.children.push({
            children: [],
            name: folder.Name,
            isBranch: true,
            id: folder.UniqueId,
          })
        })

        r.RootFolder.Files.results.forEach(function (file: any) {
          joined.children.push({
            name: file.Name, id:
            file.Id,
            isBranch: false
          })
        })

        r.Webs.results.forEach(function (web: any) {
          joined.children.push({
            name: web.Title,
            id: web.Id,
            children: [],
            isBranch: true
          })
        })

        postMessage({
          name: '',
          children: joined.children.sort((a, b) => a.name.localeCompare(b.name))
        });

      })
  })

}
