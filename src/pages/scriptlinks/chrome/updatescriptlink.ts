import * as SP from '@pnp/sp/presets/all'
import * as Logging from '@pnp/logging'
import * as Queryable from '@pnp/queryable'

export const updateCustomAction = (values: any, extPath: string) => {

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

  /* prepare payload */
  const payload: { [k: string]: any } = {}
  payload.Location = 'ScriptLink'
  payload.Sequence = values.Sequence

  let querystrings = ''
    let url = values.Url
  if (url.split('?').length > 1) {
    querystrings = '?' + url.split('?')[1]
    url = url.split('?')[0]
  }

  // if url starts with ~ and ends .js we can inject with ScriptSrc (o365 / onprem)
  // if we are in o365, we can inject anything that ends with .js with ScriptSrc
  if ((url.indexOf('~') > -1 && url.match(/.js$/)) || (window.location.href.indexOf('.sharepoint.com') > 0 && url.match(/.js$/))) {
    payload.ScriptSrc = url + querystrings
  } else if (url.match(/.js$/) && window.location.href.indexOf('.sharepoint.com') === -1) {

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
      if (values.Scope === 2) {
        // check that uca exists in site
        return sp.site.userCustomActions.getById(values.Id)()
          .then(uca => {
            // update uca if exists
            if (uca && uca.Id) {
              return sp.site.userCustomActions.getById(values.Id).update(payload)
                .then(() => {
                  return {
                    success: true,
                    result: [],
                    errorMessage: '',
                    source: 'chrome-sp-editor',
                  }
                })
                .catch(error => {
                  console.error('Error updating site collection custom action:', error);
                  return {
                    success: false,
                    result: [],
                    errorMessage: error?.message || 'Failed to update site collection custom action',
                    source: 'chrome-sp-editor',
                  }
                })
            } else {
              // uca did not exists in site, so scope must have been switched
              // so lets remove it from web
              return sp.web.userCustomActions.getById(values.Id).delete()
                .then(res => {
                  // and then add it to site
                  return sp.site.userCustomActions.add(payload)
                    .then(() => {
                      return {
                        success: true,
                        result: [],
                        errorMessage: '',
                        source: 'chrome-sp-editor',
                      }
                    })
                    .catch(error => {
                      console.error('Error adding custom action to site:', error);
                      return {
                        success: false,
                        result: [],
                        errorMessage: error?.message || 'Failed to add custom action to site collection',
                        source: 'chrome-sp-editor',
                      }
                    })
                })
                .catch(error => {
                  console.error('Error deleting custom action from web:', error);
                  return {
                    success: false,
                    result: [],
                    errorMessage: error?.message || 'Failed to delete custom action from web',
                    source: 'chrome-sp-editor',
                  }
                })
            }
          })
          .catch(error => {
            console.error('Error getting site collection custom action:', error);
            return {
              success: false,
              result: [],
              errorMessage: error?.message || 'Failed to get site collection custom action',
              source: 'chrome-sp-editor',
            }
          })
        // web scope
      } else {
        // check that uca exists in web
        return sp.web.userCustomActions.getById(values.Id)()
          .then(uca => {
            // update uca if exists
            if (uca && uca.Id) {
              return sp.web.userCustomActions.getById(values.Id).update(payload)
                .then(() => {
                  return {
                    success: true,
                    result: [],
                    errorMessage: '',
                    source: 'chrome-sp-editor',
                  }
                })
                .catch(error => {
                  console.error('Error updating web custom action:', error);
                  return {
                    success: false,
                    result: [],
                    errorMessage: error?.message || 'Failed to update web custom action',
                    source: 'chrome-sp-editor',
                  }
                })
            } else {
              // uca did not exists in web, so scope must have been switched
              // so lets remove it from site
              return sp.site.userCustomActions.getById(values.Id).delete()
                .then(res => {
                  // and then add it to web
                  return sp.web.userCustomActions.add(payload)
                    .then(() => {
                      return {
                        success: true,
                        result: [],
                        errorMessage: '',
                        source: 'chrome-sp-editor',
                      }
                    })
                    .catch(error => {
                      console.error('Error adding custom action to web:', error);
                      return {
                        success: false,
                        result: [],
                        errorMessage: error?.message || 'Failed to add custom action to web',
                        source: 'chrome-sp-editor',
                      }
                    })
                })
                .catch(error => {
                  console.error('Error deleting custom action from site:', error);
                  return {
                    success: false,
                    result: [],
                    errorMessage: error?.message || 'Failed to delete custom action from site collection',
                    source: 'chrome-sp-editor',
                  }
                })
            }
          })
          .catch(error => {
            console.error('Error getting web custom action:', error);
            return {
              success: false,
              result: [],
              errorMessage: error?.message || 'Failed to get web custom action',
              source: 'chrome-sp-editor',
            }
          })
      }

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

