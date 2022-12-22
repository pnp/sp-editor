import * as SP from '@pnp/sp/presets/all'
import * as Logging from '@pnp/logging'
import * as Queryable from '@pnp/queryable'

// we cannot use async methods, they do not work correctly when running 'npm run build',
// async methods works when running 'npm run watch'
export function createWebProperty(...args: any) {

  /* get parameters */
  const params = args
  const functionName = params[0].name
  const key = params[1]
  const value = params[2]
  const indexed = params[3];

  /* import pnp */
  type libTypes = [Promise<typeof SP>, Promise<typeof Logging>, Promise<typeof Queryable>];

  Promise.all<libTypes>([
    (window as any).SystemJS.import((window as any).mod_sp),
    (window as any).SystemJS.import((window as any).mod_logging),
    (window as any).SystemJS.import((window as any).mod_queryable)
  ]).then(([pnpsp, pnplogging, pnpqueryable]) => {

    function SPSoapHandler() {
      return (instance) => {
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

    const sp = pnpsp.spfi().using(pnpsp.SPBrowser({ baseUrl: (window as any)._spPageContextInfo.webAbsoluteUrl }))
      .using(SPSoapHandler())
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

    let webid = ''
    let siteid = ''

    sp.site.select('Id')().then((site) => {
      siteid = site.Id
      sp.web.select('Id, EffectiveBasePermissions')().then((web: any) => {

        if (!sp.web.hasPermissions(web.EffectiveBasePermissions, pnpsp.PermissionKind.AddAndCustomizePages)) {
          window.postMessage(JSON.stringify({
            function: functionName,
            success: false,
            result: null,
            errorMessage: 'No script is enabled, cannot edit Web Properties',
            source: 'chrome-sp-editor',
          }), '*')
          return
        }

        webid = web.Id
        const payload = `
          <Request xmlns="http://schemas.microsoft.com/sharepoint/clientquery/2009" SchemaVersion="15.0.0.0" LibraryVersion="16.0.0.0" ApplicationName="SPEditor">
            <Actions>
              <Method Name="SetFieldValue" Id="9" ObjectPathId="4">
                <Parameters>
                  <Parameter Type="String">${key}</Parameter>
                  <Parameter Type="String">${value}</Parameter>
                </Parameters>
              </Method>
              <Method Name="Update" Id="10" ObjectPathId="2" />
            </Actions>
            <ObjectPaths>
              <Identity Id="2" Name="740c6a0b-85e2-48a0-a494-e0f1759d4aa7:site:${siteid}:web:${webid}" />
              <Property Id="4" ParentId="2" Name="AllProperties" />
            </ObjectPaths>
          </Request>`

        pnpsp.spPost(pnpsp.Web(sp.web, `/_vti_bin/client.svc/ProcessQuery`), { body: payload })
          .then(r => {
            if (r[0]?.ErrorInfo?.ErrorMessage) {
              window.postMessage(JSON.stringify({
                function: functionName,
                success: false,
                result: null,
                errorMessage: r[0].ErrorInfo.ErrorMessage,
                source: 'chrome-sp-editor',
              }), '*')
              return
            }
            sp.web.allProperties.select('vti_indexedpropertykeys')().then(result => {

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
              for (let i = 0; i < key.length; ++i) {
                bytes.push(key.charCodeAt(i))
                bytes.push(0)
              }

              const b64encoded = window.btoa(String.fromCharCode.apply(null, bytes))
              let newIndexValue = ''

              const propertyBag = allProps.find((el) => el.key === 'vti_indexedpropertykeys')

              if (!propertyBag && !indexed) {
                postMessage()
              } else {
                if (indexed) {
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

                pnpsp.spPost(pnpsp.Web(sp.web, `/_vti_bin/client.svc/ProcessQuery`), { body: payload2 })
                  .then(r2 => {
                    if (r2[0]?.ErrorInfo?.ErrorMessage) {
                      window.postMessage(JSON.stringify({
                        function: functionName,
                        success: false,
                        result: null,
                        errorMessage: r2[0].ErrorInfo.ErrorMessage,
                        source: 'chrome-sp-editor',
                      }), '*')
                      return
                    }
                    postMessage()
                  })
              }
            })
          })
      })
    })
  })
}
