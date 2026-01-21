import * as SP from '@pnp/sp/presets/all';
import * as Logging from '@pnp/logging';
import * as Queryable from '@pnp/queryable';

export const getFiles = (extPath: string, webId: string, type: string, relativeUrl: string) => {
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

    const handleError = (error: any) => {
      let errorMessage = error.message;
      if (error !== null && error !== void 0 && error.isHttpRequestError) {
        // we can read the json from the response
        return error.response.json().then((json: any) => {
          // if we have a value property we can show it
          errorMessage = typeof json['odata.error'] === 'object' ? json['odata.error'].message.value : error.message;
          return {
            success: false,
            result: null,
            errorMessage: errorMessage,
            source: 'chrome-sp-editor',
          };
        });
      } else {
        // not an HttpRequestError so we just log message
        return {
          success: false,
          result: null,
          errorMessage: errorMessage,
          source: 'chrome-sp-editor',
        };
      }
    };

    // if we opening a folder
    if (type === 'folder') {
      return sp.site
        .openWebById(webId)
        .then((w) => {
          return w.web
            .getFolderByServerRelativePath(relativeUrl)
            .expand('Folders, Files, Folders/ParentFolder')()
            .then((r: any) => {
              const joined: any[] = [];
              
              var createItem = function(item: any, itemType: string, additionalProps: object) {
                return Object.assign({}, {
                  id: item.ServerRelativeUrl,
                  portalUrl: (window as any)._spPageContextInfo.portalUrl || 
                             (window as any)._spPageContextInfo.siteAbsoluteUrl + 
                             (window as any)._spPageContextInfo.siteServerRelativeUrl,
                  webServerRelativeUrl: (window as any)._spPageContextInfo.webServerRelativeUrl,
                  webId: w.data.Id,
                  webUrl: w.data.Url,
                  name: item.Name,
                  ServerRelativeUrl: item.ServerRelativeUrl,
                  type: itemType,
                }, additionalProps || {});
              };
              
              r.Folders.results.forEach((folder: any) => {
                joined.push(createItem(folder, 'folder', { expanded: false }));
              });
              
              r.Files.results.forEach((file: any) => {
                joined.push(createItem(file, 'file', { CustomizedPageStatus: file.CustomizedPageStatus, fileInfo: file }));
              });
              return joined;
            })
            .catch(handleError);
        })
        .catch(handleError);
      // if we opening a web
    } else if (type === 'web') {
      return sp.site
        .openWebById(webId)
        .then((w) => {
          return w.web
            .expand('Webs, Folders, RootFolder/Files')
            .select(
              'Id, Url, Webs/Id, Webs/Title, Webs/ServerRelativeUrl, Folders/Name, Folders/UniqueId, Folders/ServerRelativeUrl, Folders/ParentFolder, RootFolder/Files'
            )()
            .then((r: any) => {
              const joined: any[] = [];
              
              var createItem = function(item: any, itemType: string, additionalProps: object) {
                return Object.assign({}, {
                  id: item.ServerRelativeUrl,
                  portalUrl: (window as any)._spPageContextInfo.portalUrl || 
                             (window as any)._spPageContextInfo.siteAbsoluteUrl + 
                             (window as any)._spPageContextInfo.siteServerRelativeUrl,
                  webServerRelativeUrl: (window as any)._spPageContextInfo.webServerRelativeUrl,
                  webId: item.Id || r.Id,
                  webUrl: r.Url,
                  name: item.Name || item.Title,
                  ServerRelativeUrl: item.ServerRelativeUrl,
                  type: itemType,
                }, additionalProps || {});
              };
              
              r.Folders.results.forEach((folder: any) => {
                joined.push(createItem(folder, 'folder', { toggled: false, children: [] }));
              });
              
              r.RootFolder.Files.results.forEach((file: any) => {
                joined.push(createItem(file, 'file', { CustomizedPageStatus: file.CustomizedPageStatus, fileInfo: file }));
              });
              
              r.Webs.results.forEach((web: any) => {
                joined.push(createItem(web, 'web', { toggled: false, children: [] }));
              });
              return joined;
            })
            .catch(handleError);
        })
        .catch(handleError);
      // initial load
    } else {
      return sp.web
        .expand('RootFolder')
        .select(
          'Id, Url, RootFolder/UniqueId, RootFolder/Name, RootFolder/ServerRelativeUrl'
        )()
        .then((r: any) => {
          const joined: any[] = [];
          joined.push({
            id: r.RootFolder.ServerRelativeUrl,
            portalUrl: (window as any)._spPageContextInfo.portalUrl,
            webServerRelativeUrl: (window as any)._spPageContextInfo.webServerRelativeUrl,
            webId: r.Id,
            webUrl: r.Url,
            name: r.RootFolder.Name || r.RootFolder.ServerRelativeUrl,
            ServerRelativeUrl: r.RootFolder.ServerRelativeUrl,
            type: 'web',
            toggled: false,
            children: [],
          });    
          return joined;
        })
        .catch(handleError);
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
