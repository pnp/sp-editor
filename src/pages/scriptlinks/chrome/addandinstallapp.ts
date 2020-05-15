import { ILogEntry } from '@pnp/logging'
import * as pnp from '@pnp/pnpjs'
import { IApp } from '@pnp/sp/appcatalog'

// we cannot use async methods, they do not work correctly when running 'npm run build',
// async methods works when running 'npm run watch'
export function addAndInstallApp(...args: any) {

  /* get parameters */
  const params = args
  const functionName = params[0].name
  const url = params[1];

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

    $pnp.sp.getTenantAppCatalogWeb().then(appCatweb => {
      const catalog = appCatweb.getAppCatalog()
      catalog.filter(`ProductId eq '${spScriptLinksAppId}'`).get().then(app => {
        if (app.length === 0) {
          fetch(url).then(response => {
            response.blob().then(blob => {
              catalog.add('sp-scriptlinks.sppkg', blob, true).then(r => {
                catalog.getAppById(spScriptLinksAppId).deploy()
                  .then(() => $pnp.sp.web.getAppCatalog()
                    .getAppById(spScriptLinksAppId).install()
                    .then(() => postMessage('App added to AppCatalog and installed to site succesfully')))
              })
            })
          })
        } else {
          $pnp.sp.web.getAppCatalog().getAppById(spScriptLinksAppId)().then((spApp: IAppInfo) => {
            if (spApp.InstalledVersion === '') {
              $pnp.sp.web.getAppCatalog().getAppById(spScriptLinksAppId).install().then(() => postMessage('App Installed succesfully'))
            } else if (spApp.InstalledVersion < spApp.AppCatalogVersion) {
              $pnp.sp.web.getAppCatalog().getAppById(spScriptLinksAppId).upgrade().then(() => postMessage(`App upgraded succesfully to version ${spApp.InstalledVersion}`))
            } else {
              postMessage('App already installed to this site')
            }
          })
        }
      })
    })
  })

}
