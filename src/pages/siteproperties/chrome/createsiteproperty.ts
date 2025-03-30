import * as SP from '@pnp/sp/presets/all';
import * as Logging from '@pnp/logging';
import * as Queryable from '@pnp/queryable';

export const createSiteProperty = (values: any, siteId: string, extPath: string) => {
  return moduleLoader(extPath).then((modules) => {
    /*** map modules ***/
    let pnpsp = modules[0];
    let pnplogging = modules[1];
    let pnpqueryable = modules[2];

    function SPSoapHandler() {
      return (instance: Queryable.Queryable) => {
        instance.using(
          pnpsp.DefaultHeaders(),
          pnpsp.DefaultInit(),
          pnpqueryable.BrowserFetchWithRetry(),
          pnpqueryable.DefaultParse(),
          pnpsp.RequestDigest()
        );

        // fix url for SOAP call
        instance.on.pre.prepend(async (url, init, result) => {
          if (url.indexOf('/_vti_bin/client.svc/ProcessQuery') > -1) {
            url = url.replace(/_api.*_vti_bin/, '_vti_bin');
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
          pnpqueryable.DefaultParse()
        );

        instance.on.pre.prepend(async (url, init, result) => {
          url = props?.baseUrl
            ? new URL(url, props.baseUrl.endsWith('/') ? props.baseUrl : props.baseUrl + '/').toString()
            : url;

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
      .using(
        pnpqueryable.InjectHeaders({
          Accept: 'application/json; odata=verbose',
          'Cache-Control': 'no-cache',
          'X-ClientService-ClientTag': 'SPEDITOR',
        })
      );

    /*** clear previous log listeners ***/
    pnplogging.Logger.clearSubscribers();

    /*** setup log listener ***/
    const listener = pnplogging.FunctionListener((entry) => {
      entry.data.response
        .clone()
        .json()
        .then((error: any) => {
          return {
            success: false,
            result: null,
            errorMessage: error.error.message.value,
            source: 'chrome-sp-editor',
          };
        });
    });
    pnplogging.Logger.subscribe(listener);

    debugger;

    const sitePropertyPayload = (pkey: any, pvalue: any, psiteId: any) => {
      return `
            <Request xmlns="http://schemas.microsoft.com/sharepoint/clientquery/2009" SchemaVersion="15.0.0.0" LibraryVersion="16.0.0.0" ApplicationName="SPEditor">
            <Actions>
              <ObjectPath Id="1" ObjectPathId="0" />
              <ObjectPath Id="3" ObjectPathId="2" />
              <ObjectPath Id="5" ObjectPathId="4" />
              <ObjectPath Id="7" ObjectPathId="6" />
              <ObjectPath Id="9" ObjectPathId="8" />
              <ObjectPath Id="11" ObjectPathId="10" />
              <Method Name="SetFieldValue" Id="12" ObjectPathId="10">
                <Parameters>
                  <Parameter Type="String">${pkey}</Parameter>
                  <Parameter Type="String">${pvalue}</Parameter>
                </Parameters>
              </Method>
              <Method Name="Update" Id="13" ObjectPathId="8" />
            </Actions>
            <ObjectPaths>
              <StaticProperty Id="0" TypeId="{3747adcd-a3c3-41b9-bfab-4a64dd2f1e0a}" Name="Current" />
              <Property Id="2" ParentId="0" Name="Web" />
              <Property Id="4" ParentId="2" Name="Lists" />
              <Method Id="6" ParentId="4" Name="GetById">
                <Parameters>
                  <Parameter Type="String">${psiteId}</Parameter>
                </Parameters>
              </Method>
              <Property Id="8" ParentId="6" Name="RootFolder" />
              <Property Id="10" ParentId="8" Name="Properties" />
            </ObjectPaths>
          </Request>`;
    };

    return pnpsp
      .spPost(pnpsp.Web(sp.web, `/_vti_bin/client.svc/ProcessQuery`), {
        body: sitePropertyPayload(values.key, values.value, siteId),
      })
      .then((r) => {
        if (r[0]?.ErrorInfo?.ErrorMessage) {
          return {
            success: false,
            result: null,
            errorMessage: r[0].ErrorInfo.ErrorMessage,
            source: 'chrome-sp-editor',
          };
        }
        return sp.web.lists
          .getById(values.siteId)
          .expand('RootFolder/Properties')
          .select('RootFolder/Properties/vti_x005f_indexedpropertykeys')()
          .then((res: any) => {
            const vtiprop = res.RootFolder.Properties.vti_x005f_indexedpropertykeys;

            const bytes = [];
            for (let i = 0; i < values.key.length; ++i) {
              bytes.push(values.key.charCodeAt(i));
              bytes.push(0);
            }

            const b64encoded = window.btoa(String.fromCharCode.apply(null, bytes)) + '|';
            let newIndexValue = '';
            // TODO check indexed using array/find
            if (values.indexed) {
              newIndexValue =
                vtiprop && vtiprop.length > 0
                  ? vtiprop.indexOf(b64encoded) === -1
                    ? `${vtiprop}${b64encoded}`
                    : vtiprop
                  : b64encoded;
            } else {
              if (vtiprop && vtiprop.length > 0) {
                newIndexValue = vtiprop;
                newIndexValue = newIndexValue.replace(b64encoded, '');
              }
            }
            if ((!vtiprop && !values.indexed) || (vtiprop && !values.indexed && vtiprop.indexOf(b64encoded) === -1)) {
              return {
                success: true,
                result: [],
                errorMessage: '',
                source: 'chrome-sp-editor',
              };
            } else {
              return pnpsp
                .spPost(pnpsp.Web(sp.web, `/_vti_bin/client.svc/ProcessQuery`), {
                  body: sitePropertyPayload('vti_indexedpropertykeys', newIndexValue, values.siteId),
                })
                .then((r2) => {
                  if (r2[0]?.ErrorInfo?.ErrorMessage) {
                    return {
                      success: false,
                      result: null,
                      errorMessage: r2[0].ErrorInfo.ErrorMessage,
                      source: 'chrome-sp-editor',
                    };
                  }
                  return {
                    success: true,
                    result: [],
                    errorMessage: '',
                    source: 'chrome-sp-editor',
                  };
                });
            }
          });
      });
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
          (window as any).SystemJS.import(extPath + 'bundles/queryable.es5.umd.bundle.js'),
        ]).then((modules) => {
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
};
