import * as SP from '@pnp/sp/presets/all'
import * as Logging from '@pnp/logging'
import * as Queryable from '@pnp/queryable'

// we cannot use async methods, they do not work correctly when running 'npm run build',
// async methods works when running 'npm run watch'
export function deleteCustomActions(...args: any) {

  /* get parameters */
  const params = args
  const functionName = params[0].name
  const ucas: any[] = JSON.parse(decodeURIComponent(params[1]).replace(/%27/g, "'"));

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

    const postMessage = () => {
      window.postMessage(JSON.stringify({
        function: functionName,
        success: true,
        result: [],
        errorMessage: '',
        source: 'chrome-sp-editor',
      }), '*')
    }
    const promises: any[] = []

    sp.web.select('Id, EffectiveBasePermissions')().then((web: any) => {
      if (!sp.web.hasPermissions(web.EffectiveBasePermissions, pnpsp.PermissionKind.AddAndCustomizePages)) {
        window.postMessage(JSON.stringify({
          function: functionName,
          success: false,
          result: null,
          errorMessage: 'No script is enabled, cannot edit Custom Actions',
          source: 'chrome-sp-editor',
        }), '*')
        return
      }

      ucas.forEach(uca => {
        if (uca.Scope === 2) {
          promises.push(sp.site.userCustomActions.getById(uca.Id).delete())
        } else {
          promises.push(sp.web.userCustomActions.getById(uca.Id).delete())
        }
      })
      Promise.all(promises).then(postMessage)
    })
  })
}
