import { Dispatch } from 'redux'
import * as rootActions from '../../../store/home/actions'
import { HomeActions, MessageBarColors } from '../../../store/home/types'
import * as actions from '../../../store/spshoot/actions'
import { ISPShootPayload, SPShootActions } from '../../../store/spshoot/types'
import { exescript } from '../../../utilities/chromecommon'
import { getPnpjsPath, getSystemjsPath } from '../../../utilities/utilities'
import { getContext } from './getContext'

export async function runRestCall(dispatch: Dispatch<SPShootActions | HomeActions>, payload: ISPShootPayload) {

  dispatch(rootActions.setLoading(true));

  const executeScript = (payload: any, extPath: string) => {

    const loadScript = (src: string) => {
      return new Promise<void>(function (resolve) {
        const s = document.createElement('script');
        s.src = src;
        s.onload = () => resolve();
        (document.head || document.documentElement).appendChild(s);
      });
    }

    const shoot = (payload: any) => {

      /* import pnp */
      return Promise.all([
        (window as any).SystemJS.import(extPath + 'bundles/sp.es5.umd.bundle.js'),
        (window as any).SystemJS.import(extPath + 'bundles/logging.es5.umd.bundle.js'),
        (window as any).SystemJS.import(extPath + 'bundles/queryable.es5.umd.bundle.js')])
        .then(modules => {

          /*** map modules ***/
          var pnpsp = modules[0];
          var pnplogging = modules[1];
          var pnpqueryable = modules[2];

          /*** custom httpHandler ***/
          const rawFetchHandler = () => {
            return instance => {
              instance.using(pnpsp.DefaultHeaders(), pnpsp.DefaultInit(), pnpqueryable.BrowserFetchWithRetry(), pnpqueryable.DefaultParse(), pnpsp.RequestDigest());
              instance.on.pre.prepend((url, init, result) => {
                if (url.indexOf('###') > -1) {
                  return [url.substring(url.indexOf("###") + 3), init, result];
                }
                return [url, init, result];
              });
              return instance;
            };
          }

          /***  init pnpjs ***/
          const sp = pnpsp.spfi().using(pnpsp.SPBrowser({
            baseUrl: (window as any)._spPageContextInfo.webAbsoluteUrl
          })).using(rawFetchHandler()).using(pnpqueryable.InjectHeaders({
            "Accept": "application/json; odata=verbose",
            "Cache-Control": "no-cache",
            "X-ClientService-ClientTag": "SPEDITOR"
          }));

          /*** clear previous log listeners ***/
          pnplogging.Logger.clearSubscribers();

          /*** setup log listener ***/
          const listener = pnplogging.FunctionListener(entry => {
            entry.data.response.clone().json().then(error => {
              return {
                success: false,
                result: null,
                errorMessage: error.error.message.value,
                source: 'chrome-sp-editor'
              }
            });
          });
          pnplogging.Logger.subscribe(listener);

          /*** check that headers valid object ***/
          try {
            JSON.parse(payload.headers);
          } catch (ex) {
            return {
              success: false,
              result: null,
              errorMessage: 'Could not parse request headers!: ' + payload.headers,
              source: 'chrome-sp-editor'
            }
          }

          /*** execute request, add ### to trigger custom httpHandler ***/
          return pnpsp.spPost(pnpsp.Web(sp.web, "###" + payload.path), {
            headers: JSON.parse(payload.headers),
            method: payload.method,
            body: payload.method === 'GET' ? null : payload.body
          }).then(json => {
            if (json.status === 204) {
              return json
            } else {
              if (json && json['odata.error']) {
                const errori = json['odata.error'].message.value;
                return {
                  success: false,
                  result: null,
                  errorMessage: errori.length > 300 ? errori.substring(0, 299) : errori,
                  source: 'chrome-sp-editor'
                }
              } else {
                return json
              }
            }
          }
          ).catch(error => {
            var errorMessage = error.message;
            if (error !== null && error !== void 0 && error.isHttpRequestError) {
              // we can read the json from the response
              const json = error.response.json().then(json => {
                // if we have a value property we can show it
                errorMessage = typeof json["odata.error"] === "object" ? json["odata.error"].message.value : error.message;
              });
            } else {
              // not an HttpRequestError so we just log message
              console.log(error);
            }
            return {
              success: false,
              result: null,
              errorMessage: errorMessage,
              source: 'chrome-sp-editor'
            }
          });
        });
    }

    return loadScript(extPath + 'bundles/system.js').then(() => shoot(payload))
  }

  chrome.tabs.query({ currentWindow: true, active: true }, (tabs: any) => {

    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      world: 'MAIN',
      args: [payload, chrome.runtime.getURL('')],
      func: executeScript,
    }).then(injectionResults => {
      if (injectionResults[0].result) {
        const res = injectionResults[0].result
        if (res.success === false) {
          dispatch(rootActions.setAppMessage({
            showMessage: true,
            message: res.errorMessage,
            color: MessageBarColors.danger,
          }))
          dispatch(actions.setResults(res))
        } else {
          console.log(res) // log the result for testing
          dispatch(actions.setResults(res))
          // hide loading component
        }
        dispatch(rootActions.setLoading(false))
      }
    });
  });

}

export async function getContextInfo(dispatch: Dispatch<SPShootActions | HomeActions>) {

  dispatch(rootActions.setLoading(true));

  chrome.tabs.query({ currentWindow: true, active: true }, (tabs: any) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      world: 'MAIN',
      func: () => {
        return (window as any)._spPageContextInfo || (window as any).moduleLoaderPromise ? (window as any).moduleLoaderPromise.then((e: any) => {
          return (window as any)._spPageContextInfo = e.context._pageContext._legacyPageContext;
        }) : null;
      }
    }).then(injectionResults => {
      if (injectionResults[0].result) {
        const res = injectionResults[0].result
        dispatch(actions.setContext(res))
        dispatch(rootActions.setLoading(false))
      } else {
        dispatch(rootActions.setAppMessage({
          showMessage: true,
          message: 'Could not get context info!',
          color: MessageBarColors.danger,
        }))
      }
      dispatch(rootActions.setLoading(false))
    });
  });

}
