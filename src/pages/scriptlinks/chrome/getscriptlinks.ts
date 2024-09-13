import * as SP from '@pnp/sp/presets/all'
import * as Logging from '@pnp/logging'
import * as Queryable from '@pnp/queryable'

export const getCustomActions = (extPath: string) => {

  return moduleLoader(extPath).then((modules) => {

    /*** map modules ***/
    var pnpsp = modules[0];
    var pnplogging = modules[1];
    var pnpqueryable = modules[2];


    /***  init pnpjs ***/
    const sp = pnpsp.spfi().using(pnpsp.SPBrowser({ baseUrl: (window as any)._spPageContextInfo.webAbsoluteUrl }))
      .using(pnpqueryable.InjectHeaders({
        "Accept": "application/json; odata=verbose",
        "Cache-Control": "no-cache",
        "X-ClientService-ClientTag": "SPEDITOR"
      }));

    /*** clear previous log listeners ***/
    pnplogging.Logger.clearSubscribers();

    /*** setup log listener ***/
    const listener = pnplogging.FunctionListener(entry => {
      entry.data.response.clone().json().then((error: any) => {
        return {
          success: false,
          result: null,
          errorMessage: error.error.message.value,
          source: 'chrome-sp-editor'
        }
      });
    });
    pnplogging.Logger.subscribe(listener);

      // get site custom actions
    return sp.site.userCustomActions
      .filter("Location ne 'ClientSideExtension.ApplicationCustomizer'")
      .select('Sequence, Name, ScriptSrc, ScriptBlock, Scope, Id, Title').orderBy('Sequence', true)()
      .then(siteactions => {
        // get web custom actions
        return sp.web.userCustomActions
          .filter("Location ne 'ClientSideExtension.ApplicationCustomizer'")
          .select('Sequence, Name, ScriptSrc, ScriptBlock, Scope, Id, Title').orderBy('Sequence', true)()
          .then(webactions => {
            // join customactions
            // TODO: add order ??
            const actions = siteactions.concat(webactions).sort((a, b) => a.Sequence - b.Sequence)
            // post results back to extension
            return {
              success: true,
              result: actions,
              errorMessage: '',
              source: 'chrome-sp-editor',
            }
          })
      })

  });

  function moduleLoader(extPath: string) {

    type libTypes = [typeof SP, typeof Logging, typeof Queryable];
    /*** load systemjs ***/
    return new Promise<libTypes>((resolve) => {
      const s = document.createElement('script');
      s.src = extPath + 'bundles/system.js';
      (document.head || document.documentElement).appendChild(s);
      s.onload = () =>
        /*** load pnpjs modules ***/
        Promise.all<libTypes>([
          (window as any).SystemJS.import(extPath + 'bundles/sp.es5.umd.bundle.js'),
          (window as any).SystemJS.import(extPath + 'bundles/logging.es5.umd.bundle.js'),
          (window as any).SystemJS.import(extPath + 'bundles/queryable.es5.umd.bundle.js')])
          .then((modules) => {
            // if we are in a modern page we need to get the _spPageContextInfo from the module loader
            if (!(window as any)._spPageContextInfo && (window as any).moduleLoaderPromise) {
              (window as any).moduleLoaderPromise.then((e: any) => {
                (window as any)._spPageContextInfo = e.context._pageContext._legacyPageContext;
                resolve(modules);
              });
            } else {
              resolve(modules);
            }
          });
    });
  }

}


