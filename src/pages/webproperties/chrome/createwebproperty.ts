import * as SP from '@pnp/sp/presets/all'
import * as Logging from '@pnp/logging'
import * as Queryable from '@pnp/queryable'

export const createWebProperty = (values: any, extPath: string) => {

  return moduleLoader(extPath).then((modules) => {

    /*** map modules ***/
    var pnpsp = modules[0];
    var pnplogging = modules[1];
    var pnpqueryable = modules[2];


    function SPSoapHandler() {
      return (instance: Queryable.Queryable) => {
        instance.using(
          pnpsp.DefaultHeaders(),
          pnpsp.DefaultInit(),
          pnpqueryable.BrowserFetchWithRetry(),
          pnpqueryable.DefaultParse(),
          pnpsp.RequestDigest());

        // fix url for SOAP call
        instance.on.pre.prepend(async (url, init, result) => {
          if (url.indexOf('/_vti_bin/client.svc/ProcessQuery') > -1) {
            url = url.replace(/_api.*_vti_bin/, '_vti_bin')
          }
          return [url, init, result];
        });
        return instance;
      };
    }

    let digest: string = '';

    const SPEditor = (props?: SP.ISPBrowserProps) => {

      return (instance: Queryable.Queryable) => {
        instance.using(
          pnpsp.DefaultHeaders(),
          pnpsp.DefaultInit(),
          pnpqueryable.BrowserFetchWithRetry(),
          pnpqueryable.DefaultParse(),
        );

        instance.on.pre.prepend(async (url, init, result) => {
          url = props?.baseUrl ? new URL(url, props.baseUrl.endsWith('/') ? props.baseUrl : props.baseUrl + '/').toString() : url;

          if (['POST', 'PATCH', 'PUT', 'DELETE', 'MERGE'].includes(init.method ?? '')) {
            if (!digest) {
              const modifiedUrl = url.toString().replace(/_api.*|_vti_.*/g, '');
              const response = await fetch(`${modifiedUrl}_api/contextinfo`, {
                method: 'POST',
                headers: {
                  accept: 'application/json;odata=verbose',
                  'content-type': 'application/json;odata=verbose',
                },
              });
              const data = await response.json();
              digest = data.d.GetContextWebInformation.FormDigestValue;
            }
          
            init.headers = {
              'X-RequestDigest': digest,
              ...init.headers,
            };
          }

          return [
            url
              .replace('getFileByServerRelativePath(decodedUrl=', 'getFileByServerRelativeUrl(')
              .replace('getFolderByServerRelativePath(decodedUrl=', 'getFolderByServerRelativeUrl('),
            init,
            result,
          ];
        });
        return instance;
      };
    };

    /***  init pnpjs ***/
    const sp = pnpsp
      .spfi()
      .using(SPEditor({ baseUrl: (window as any)._spPageContextInfo.webAbsoluteUrl }))
      .using(SPSoapHandler())
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


    let webid = ''
    let siteid = ''

    return sp.site.select('Id')().then((site) => {
      siteid = site.Id
      return sp.web.select('Id, EffectiveBasePermissions')().then((web: any) => {

       /* if (!sp.web.hasPermissions(web.EffectiveBasePermissions, pnpsp.PermissionKind.AddAndCustomizePages)) {
          return {
            success: false,
            result: null,
            errorMessage: 'No script is enabled, cannot edit Web Properties',
            source: 'chrome-sp-editor',
          }
        }*/

        webid = web.Id
        const payload = `
          <Request xmlns="http://schemas.microsoft.com/sharepoint/clientquery/2009" SchemaVersion="15.0.0.0" LibraryVersion="16.0.0.0" ApplicationName="SPEditor">
            <Actions>
              <Method Name="SetFieldValue" Id="9" ObjectPathId="4">
                <Parameters>
                  <Parameter Type="String">${values.key}</Parameter>
                  <Parameter Type="String">${values.value}</Parameter>
                </Parameters>
              </Method>
              <Method Name="Update" Id="10" ObjectPathId="2" />
            </Actions>
            <ObjectPaths>
              <Identity Id="2" Name="740c6a0b-85e2-48a0-a494-e0f1759d4aa7:site:${siteid}:web:${webid}" />
              <Property Id="4" ParentId="2" Name="AllProperties" />
            </ObjectPaths>
          </Request>`

        return pnpsp.spPost(pnpsp.Web(sp.web, `/_vti_bin/client.svc/ProcessQuery`), { body: payload })
          .then(r => {
            if (r[0]?.ErrorInfo?.ErrorMessage) {
              return {
                success: false,
                result: null,
                errorMessage: r[0].ErrorInfo.ErrorMessage,
                source: 'chrome-sp-editor',
              }
            }
            return sp.web.allProperties.select('vti_indexedpropertykeys')().then(result => {

              const allProps = []
              for (let prop in result) {
                if (prop && prop !== 'odata.metadata' && prop !== '__metadata' && prop !== 'odata.editLink' && prop !== 'odata.id' && prop !== 'odata.type') {

                  const re = /_x.*?_/g
                  const found = prop.match(re)
                  const origKey = prop

                  if (found !== null)
                    for (const g in found) {
                      if (g) {
                        const unesc = found[g].replace('_x', '%u').replace('_', '')
                        prop = prop.replace(found[g], unescape(unesc))
                      }
                    }
                  allProps.push({ key: prop.replace(/OData_/g, ''), value: result[origKey] })
                }
              }

              const bytes = []
              for (let i = 0; i < values.key.length; ++i) {
                bytes.push(values.key.charCodeAt(i))
                bytes.push(0)
              }

              const b64encoded = window.btoa(String.fromCharCode.apply(null, bytes))
              let newIndexValue = ''

              const propertyBag = allProps.find((el) => el.key === 'vti_indexedpropertykeys')

              if (!propertyBag && !values.indexed) {
                return {
                  success: true,
                  result: [],
                  errorMessage: '',
                  source: 'chrome-sp-editor',
                }
              } else {
                if (values.indexed) {
                  newIndexValue = propertyBag && propertyBag.value && propertyBag.value.length > 0 ?
                    propertyBag.value.indexOf(`${b64encoded}|`) === -1 ? `${propertyBag.value}${b64encoded}|` : propertyBag.value
                    : newIndexValue = `${b64encoded}|`
                } else {
                  if (propertyBag && propertyBag.value && propertyBag.value.length > 0) {
                    newIndexValue = propertyBag.value
                    newIndexValue = newIndexValue.replace(b64encoded + '|', '')
                  }
                }
                const payload2 = `
                <Request xmlns="http://schemas.microsoft.com/sharepoint/clientquery/2009" SchemaVersion="15.0.0.0" LibraryVersion="16.0.0.0" ApplicationName="SPEditor">
                  <Actions>
                    <Method Name="SetFieldValue" Id="9" ObjectPathId="4">
                      <Parameters>
                        <Parameter Type="String">vti_indexedpropertykeys</Parameter>
                        <Parameter Type="String">${newIndexValue}</Parameter>
                      </Parameters>
                    </Method>
                    <Method Name="Update" Id="10" ObjectPathId="2" />
                  </Actions>
                  <ObjectPaths>
                    <Identity Id="2" Name="740c6a0b-85e2-48a0-a494-e0f1759d4aa7:site:${siteid}:web:${webid}" />
                    <Property Id="4" ParentId="2" Name="AllProperties" />
                  </ObjectPaths>
                </Request>`

                return pnpsp.spPost(pnpsp.Web(sp.web, `/_vti_bin/client.svc/ProcessQuery`), { body: payload2 })
                  .then(r2 => {
                    if (r2[0]?.ErrorInfo?.ErrorMessage) {
                      return {
                        success: false,
                        result: null,
                        errorMessage: r2[0].ErrorInfo.ErrorMessage,
                        source: 'chrome-sp-editor',
                      }
                    }
                    return {
                      success: true,
                      result: [],
                      errorMessage: '',
                      source: 'chrome-sp-editor',
                    }
                  })
              }
            })
          })
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