import * as SP from '@pnp/sp/presets/all'
import * as Logging from '@pnp/logging'
import * as Queryable from '@pnp/queryable'
import { IApp } from '@pnp/sp/presets/all'
import "@pnp/sp/webs";

// we cannot use async methods, they do not work correctly when running 'npm run build',
// async methods works when running 'npm run watch'
export function addAndInstallApp(...args: any) {

  /* get parameters */
  const params = args
  const functionName = params[0].name
  const url = params[1];

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
      }, true));

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

    interface IAppInfo extends IApp {
      AadAppId: string,
      AadPermissions: any,
      AppCatalogVersion: string,
      CDNLocation: string,
      CanUpgrade: boolean,
      ContainsTenantWideExtension: boolean,
      CurrentVersionDeployed: boolean,
      Deployed: boolean,
      ErrorMessage: string,
      ID: string,
      InstalledVersion: string,
      IsClientSideSolution: boolean,
      IsEnabled: boolean,
      IsPackageDefaultSkipFeatureDeployment: boolean,
      IsValidAppPackage: boolean,
      ProductId: string,
      ShortDescription: string,
      SkipDeploymentFeature: boolean,
      ThumbnailUrl: string,
      Title: string,
    }

    sp.getTenantAppCatalogWeb().then(appCatweb => {
      appCatweb.appcatalog.filter(`ProductId eq '${spScriptLinksAppId}'`)().then(app => {
        if (app.length === 0) {
          fetch(url).then(response => {
            response.blob().then(blob => {
              appCatweb.appcatalog.add('sp-scriptlinks.sppkg', blob, true).then(r => {
                appCatweb.appcatalog.getAppById(spScriptLinksAppId).deploy()
                  .then(() => sp.web.appcatalog
                    .getAppById(spScriptLinksAppId).install()
                    .then(() => postMessage('App added to AppCatalog and installed to site succesfully')))
              })
            })
          })
        } else {
          sp.web.appcatalog.getAppById(spScriptLinksAppId)().then((spApp: IAppInfo) => {
            if (spApp.InstalledVersion === '') {
              sp.web.appcatalog.getAppById(spScriptLinksAppId).install().then(() => postMessage('App Installed succesfully'))
            } else if (spApp.InstalledVersion < spApp.AppCatalogVersion) {
              sp.web.appcatalog.getAppById(spScriptLinksAppId).upgrade().then(() => postMessage(`App upgraded succesfully to version ${spApp.InstalledVersion}`))
            } else {
              postMessage('App already installed to this site')
            }
          })
        }
      })
    })
  })

}
