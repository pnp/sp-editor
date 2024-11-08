import * as SP from '@pnp/sp/presets/all'
import * as Logging from '@pnp/logging'
import * as Queryable from '@pnp/queryable'
import { IScriptLink } from './../../../store/scriptlinks/types'

export const updateCacheCustomAction = (values: any, extPath: string) => {

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

    const ucas: any[] = values
    const promises: any[] = []  
    const timeStamp = new Date().getTime().toString();

    return sp.web.select('Id, EffectiveBasePermissions')().then((web: any) => {
      if (!sp.web.hasPermissions(web.EffectiveBasePermissions, pnpsp.PermissionKind.AddAndCustomizePages)) {
        return {
          success: false,
          result: [],
          errorMessage: 'No script is enabled, cannot edit Custom Actions',
          source: 'chrome-sp-editor',
        }
      }

      ucas.forEach((uc: IScriptLink) => {
        if(uc.Location === 'ClientSideExtension.ApplicationCustomizer'){
          return;
        }
        const scope = uc.Scope
        let url = uc.Url
        const id = uc.Id

        /* prepare payload */
        const payload: { [k: string]: any } = {}

        let querystrings = ''

        if (url.split('?').length > 1) {
          querystrings = '?' + url.split('?')[1]
          url = url.split('?')[0]
        }

        const par = new URLSearchParams(querystrings)
        par.set('sptag', timeStamp)
        querystrings = `?${par.toString()}`

        // if url starts with ~ and ends .js we can inject with ScriptSrc (o365 / onprem)
        // if we are in o365, we can inject anything that ends with .js with ScriptSrc
        if ((url.indexOf('~') > -1 && url.match(/.js$/)) || (window.location.href.indexOf('.sharepoint.') > 0 && url.match(/.js$/))) {
          payload.ScriptSrc = url + querystrings
        } else if (url.match(/.js$/) && window.location.href.indexOf('.sharepoint.') === -1) {

          let headID = ''
          let newScript = ''
          const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
          for (let i = 0; i < 5; i++) {
            headID += possible.charAt(Math.floor(Math.random() * possible.length))
          }
          for (let i = 0; i < 5; i++) {
            newScript += possible.charAt(Math.floor(Math.random() * possible.length))
          }

          let jsScriptBlock = `var ${headID} = document.getElementsByTagName("head")[0];`
          jsScriptBlock += ` var ${newScript} = document.createElement("script");`
          jsScriptBlock += ` ${newScript}.type = "text/javascript";`
          jsScriptBlock += ` ${newScript}.src = "${url}${querystrings}";`
          jsScriptBlock += ` ${headID}.appendChild(${newScript});`
          payload.ScriptBlock = jsScriptBlock
        } else if (url.match(/.css$/)) {
          // tslint:disable-next-line:prefer-template
          payload.ScriptBlock = "if (window.location.href.toLowerCase().indexOf('_layouts/15/termstoremanager.aspx') === -1) { document.write('<link rel=\"stylesheet\" href=\"" + url + querystrings + "\" />');}"
        } else {
          return {
            success: false,
            result: [],
            errorMessage: 'Only inject js or css files!',
            source: 'chrome-sp-editor',
          }
        }


        // site collection scope
        if (scope === 2) {
          // check that uca exists in site
          promises.push(sp.site.userCustomActions.getById(id)().then(uca => {
            // update uca if exists
            if (uca && uca.Id) {
              return sp.site.userCustomActions.getById(id).update(payload)
            }
          }))
          // web scope
        } else {
          // check that uca exists in web
          promises.push(sp.web.userCustomActions.getById(id)().then(uca => {
            // update uca if exists
            if (uca && uca.Id) {
              return sp.web.userCustomActions.getById(id).update(payload)
            }
          }))
        }
      })
      return Promise.all(promises).then(() => {
        return {
          success: true,
          result: [],
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
