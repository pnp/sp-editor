import * as SP from '@pnp/sp/presets/all';
import * as Logging from '@pnp/logging';
import * as Queryable from '@pnp/queryable';

export const reindexweb = (extPath: string) => {
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
      .using(
        pnpqueryable.InjectHeaders(
          {
            Accept: 'application/json; odata=verbose',
            'Cache-Control': 'no-cache',
            'X-ClientService-ClientTag': 'SPEDITOR',
          }
        )
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

    return sp.web.allProperties().then((result) => {
      const allProps = [];

      for (let key in result) {
        if (
          key &&
          key !== 'odata.metadata' &&
          key !== '__metadata' &&
          key !== 'odata.editLink' &&
          key !== 'odata.id' &&
          key !== 'odata.type'
        ) {
          const re = /_x.*?_/g;
          const found = key.match(re);
          const origKey = key;

          if (found !== null)
            for (const g in found) {
              if (g) {
                const unesc = found[g].replace('_x', '%u').replace('_', '');
                key = key.replace(found[g], unescape(unesc));
              }
            }
          allProps.push({ key: key.replace(/OData_/g, ''), value: result[origKey] });
        }
      }

      const prop = 'vti_searchversion';
      let value = 0;

      const searchversion = allProps.find((el) => el.key === prop);

      if (searchversion) {
        value = parseInt(searchversion.value);
        value += 1;
      }

      let webid = '';
      let siteid = '';

      return sp.site
        .select('Id')()
        .then((site) => {
          siteid = site.Id;
          return sp.web
            .select('Id, EffectiveBasePermissions')()
            .then((web: any) => {
              if (!sp.web.hasPermissions(web.EffectiveBasePermissions, pnpsp.PermissionKind.AddAndCustomizePages)) {
                return {
                  errorMessage: 'No script is enabled, cannot edit Web Properties',
                };
              }

              webid = web.Id;
              const payload = `
            <Request xmlns="http://schemas.microsoft.com/sharepoint/clientquery/2009" SchemaVersion="15.0.0.0" LibraryVersion="16.0.0.0" ApplicationName="SPEditor">
              <Actions>
                <Method Name="SetFieldValue" Id="9" ObjectPathId="4">
                  <Parameters>
                    <Parameter Type="String">${prop}</Parameter>
                    <Parameter Type="String">${value}</Parameter>
                  </Parameters>
                </Method>
                <Method Name="Update" Id="10" ObjectPathId="2" />
              </Actions>
              <ObjectPaths>
                <Identity Id="2" Name="740c6a0b-85e2-48a0-a494-e0f1759d4aa7:site:${siteid}:web:${webid}" />
                <Property Id="4" ParentId="2" Name="AllProperties" />
              </ObjectPaths>
            </Request>`;

              return pnpsp
                .spPost(pnpsp.Web(sp.web, `/_vti_bin/client.svc/ProcessQuery`), { body: payload })
                .then((r) => {
                  return r[0]?.ErrorInfo?.ErrorMessage ? { errorMessage: r[0].ErrorInfo.ErrorMessage } : r;
                });
            });
        });
    });
  });

  function moduleLoader(extPath: string) {
    type libTypes = [typeof SP, typeof Logging, typeof Queryable];
    const winAny = window as any;
    /*** load systemjs ***/
    return new Promise<libTypes>((resolve) => {
      const s = document.createElement('script');
      s.src = extPath + 'bundles/system.js';
      (document.head || document.documentElement).appendChild(s);
      s.onload = () =>
        /*** load pnpjs modules ***/
        Promise.all<libTypes>([
          winAny.SystemJS.import(extPath + 'bundles/sp.es5.umd.bundle.js'),
          winAny.SystemJS.import(extPath + 'bundles/logging.es5.umd.bundle.js'),
          winAny.SystemJS.import(extPath + 'bundles/queryable.es5.umd.bundle.js'),
        ]).then((modules) => {
          // if we are in a modern page we need to get the _spPageContextInfo from the module loader
          if (!winAny._spPageContextInfo && winAny.moduleLoaderPromise) {
            winAny.moduleLoaderPromise.then((e: any) => {
              winAny._spPageContextInfo = e.context._pageContext._legacyPageContext;
              resolve(modules);
            });
          } else {
            resolve(modules);
          }
        });
    });
  }
};
