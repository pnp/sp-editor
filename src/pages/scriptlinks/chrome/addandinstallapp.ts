import * as SP from '@pnp/sp/presets/all'
import * as Logging from '@pnp/logging'
import * as Queryable from '@pnp/queryable'
import { IApp } from '@pnp/sp/presets/all'
import "@pnp/sp/webs";

export const addAndInstallApp = (values: any, extPath: string) => {

  return moduleLoader(extPath).then((modules) => {

    /*** map modules ***/
    var pnpsp = modules[0];
    var pnplogging = modules[1];
    var pnpqueryable = modules[2];

    let digest: string = '';

    const SPEditor = (props?: SP.ISPBrowserProps) => {

      return (instance: Queryable.Queryable) => {
        instance.using(
          pnpsp.DefaultHeaders(),
          pnpsp.DefaultInit(),
          pnpqueryable.BrowserFetchWithRetry(),
          pnpqueryable.DefaultParse(),
        );

        instance.on.pre.prepend((url, init, result) => {
          url = props?.baseUrl ? new URL(url, props.baseUrl.endsWith('/') ? props.baseUrl : props.baseUrl + '/').toString() : url;

          const modifiedUrl = url
            .replace('getFileByServerRelativePath(decodedUrl=', 'getFileByServerRelativeUrl(')
            .replace('getFolderByServerRelativePath(decodedUrl=', 'getFolderByServerRelativeUrl(');

          if (['POST', 'PATCH', 'PUT', 'DELETE', 'MERGE'].includes(init.method ?? '')) {
            if (!digest) {
              const contextUrl = url.toString().replace(/_api.*|_vti_.*/g, '');
              return fetch(contextUrl + '_api/contextinfo', {
                method: 'POST',
                headers: {
                  accept: 'application/json;odata=verbose',
                  'content-type': 'application/json;odata=verbose',
                },
              })
              .then(function(response) { return response.json(); })
              .then(function(data) {
                digest = data.d.GetContextWebInformation.FormDigestValue;
                init.headers = Object.assign({}, { 'X-RequestDigest': digest }, init.headers);
                return [modifiedUrl, init, result];
              });
            } else {
              init.headers = Object.assign({}, { 'X-RequestDigest': digest }, init.headers);
              return Promise.resolve([modifiedUrl, init, result]);
            }
          }

          return Promise.resolve([modifiedUrl, init, result]);
        });
        return instance;
      };
    };

    /***  init pnpjs ***/
    const sp = pnpsp
      .spfi()
      .using(SPEditor({ baseUrl: (window as any)._spPageContextInfo.webAbsoluteUrl }))
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
    const url = values
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

      return sp.tenantAppcatalog.filter(`ProductId eq '${spScriptLinksAppId}'`)().then(app => {
        if (app.length === 0) {
          return fetch(url).then(response => {
            return response.blob().then(blob => {
              return sp.tenantAppcatalog.add('sp-scriptlinks.sppkg', blob, true).then(r => {
                return sp.tenantAppcatalog.getAppById(spScriptLinksAppId).deploy()
                  .then(() => sp.web.appcatalog
                    .getAppById(spScriptLinksAppId).install()
                    .then(() => {
                      return {
                        success: true,
                        result: 'App added to AppCatalog and installed to site succesfully',
                        errorMessage: '',
                        source: 'chrome-sp-editor',
                      }
                    }
                  ))
              })
            })
          })
        } else {
          return sp.tenantAppcatalog.getAppById(spScriptLinksAppId)().then((spApp: IAppInfo) => {
            if (spApp.InstalledVersion === '') {
              return sp.tenantAppcatalog.getAppById(spScriptLinksAppId).install().then(() => {
                return {
                  success: true,
                  result: 'App Installed succesfully',
                  errorMessage: '',
                  source: 'chrome-sp-editor',
                }
              })
            } else if (spApp.InstalledVersion < spApp.AppCatalogVersion) {
              return sp.tenantAppcatalog.getAppById(spScriptLinksAppId).upgrade().then(() => 
                {
                  return {
                    success: true,
                    result: `App upgraded succesfully to version ${spApp.InstalledVersion}`,
                    errorMessage: '',
                    source: 'chrome-sp-editor',
                  }
            })
            } else {
              return {
                success: true,
                result: 'App already installed to this site',
                errorMessage: '',
                source: 'chrome-sp-editor',
              }
            }
          })
        }
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

