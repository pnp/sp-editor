import * as SP from '@pnp/sp/presets/all'
import * as Logging from '@pnp/logging'
import * as Queryable from '@pnp/queryable'
import { IWebProperty } from './../../../store/webproperties/types'

// we cannot use async methods, they do not work correctly when running 'npm run build',
// async methods works when running 'npm run watch'
export function deleteWebProperties(...args: any) {

  /* get parameters */
  const params = args
  const functionName = params[0].name
  const webprops: IWebProperty[] = JSON.parse(decodeURIComponent(params[1]).replace(/%27/g, "'"));

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

    let siteid = ''
    let webid = ''

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

        const prop = webprops[0]
        const payload = `
            <Request xmlns="http://schemas.microsoft.com/sharepoint/clientquery/2009" SchemaVersion="15.0.0.0" LibraryVersion="16.0.0.0" ApplicationName="SPEditor">
              <Actions>
                <Method Name="SetFieldValue" Id="9" ObjectPathId="4">
                  <Parameters>
                    <Parameter Type="String">${prop.key}</Parameter>
                    <Parameter Type="Null" />
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
              for (let iprop in result) {
                if (iprop && iprop !== 'odata.metadata' && iprop !== '__metadata' && iprop !== 'odata.editLink' && iprop !== 'odata.id' && iprop !== 'odata.type') {

                  const re = /_x.*?_/g
                  const found = iprop.match(re)
                  const origKey = iprop

                  if (found !== null)
                    for (const g in found) {
                      if (g) {
                        const unesc = found[g].replace('_x', '%u').replace('_', '')
                        iprop = iprop.replace(found[g], unescape(unesc))
                      }
                    }
                  allProps.push({ key: iprop.replace(/OData_/g, ''), value: result[origKey] })
                }
              }

              const propertyBag = allProps.find((el) => el.key === 'vti_indexedpropertykeys')

              if (propertyBag && propertyBag.value && propertyBag.value.length > 0) {
                let newIndexValue = propertyBag.value

                const bytes = []
                for (let i = 0; i < prop.key.length; ++i) {
                  bytes.push(prop.key.charCodeAt(i))
                  bytes.push(0)
                }

                const b64encoded = window.btoa(String.fromCharCode.apply(null, bytes))
                newIndexValue = newIndexValue.replace(b64encoded + '|', '')

                if (newIndexValue !== propertyBag.value) {
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
                } else {
                  postMessage()
                }
              } else {
                postMessage()
              }
            })
          })
      })
    })
  })
}
