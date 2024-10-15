import * as SP from '@pnp/sp/presets/all';
import * as Logging from '@pnp/logging';
import * as Queryable from '@pnp/queryable';

export const getFiles = (extPath: string, webId: string, type: string, relativeUrl: string) => {
  return moduleLoader(extPath).then((modules) => {
    /*** map modules ***/
    var pnpsp = modules[0];
    var pnplogging = modules[1];
    var pnpqueryable = modules[2];

    /***  init pnpjs ***/
    const sp = pnpsp
      .spfi()
      .using(pnpsp.SPBrowser({ baseUrl: (window as any)._spPageContextInfo.webAbsoluteUrl }))
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

    /*** execute request, add ### to trigger custom httpHandler ***/

    // if we opening a folder
    if (type === 'folder') {
      return sp.site
        .openWebById(webId)
        .then((w) => {
          return w.web
            .getFolderByServerRelativePath(relativeUrl)
            .expand('Folders, Files')()
            .then((r: any) => {
              const joined: any[] = [];
              r.Folders.results.forEach(function (folder: any) {
                joined.push({
                  id: folder.UniqueId,
                  webId: w.data.Id,
                  name: folder.Name,
                  ServerRelativeUrl: folder.ServerRelativeUrl,
                  type: 'folder',
                  expanded: false,
                });
              });
              r.Files.results.forEach(function (file: any) {
                joined.push({
                  id: file.UniqueId,
                  webId: w.data.Id,
                  name: file.Name,
                  ServerRelativeUrl: file.ServerRelativeUrl,
                  type: 'file',
                  CustomizedPageStatus: file.CustomizedPageStatus,
                });
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
          'Id, Webs/Id, Webs/Title, Webs/ServerRelativeUrl, Folders/Name, Folders/UniqueId, Folders/ServerRelativeUrl, RootFolder/Files/ServerRelativeUrl, RootFolder/Files/Name, RootFolder/Files/UniqueId, RootFolder/Files/CustomizedPageStatus'
        )()
        .then((r: any) => {
          const joined: any[] = [];

          r.Folders.results.forEach(function (folder: any) {
            joined.push({
              id: folder.UniqueId,
              webId: r.Id,
              name: folder.Name,
              ServerRelativeUrl: folder.ServerRelativeUrl,
              type: 'folder',
              toggled: false,
              children: [],
            });
          });
          r.RootFolder.Files.results.forEach(function (file: any) {
            joined.push({
              id: file.UniqueId,
              webId: r.Id,
              name: file.Name,
              ServerRelativeUrl: file.ServerRelativeUrl,
              type: 'file',
              CustomizedPageStatus: file.CustomizedPageStatus,
            });
          });
          r.Webs.results.forEach(function (web: any) {
            joined.push({
              id: web.Id,
              webId: web.Id,
              name: web.Title,
              ServerRelativeUrl: web.ServerRelativeUrl,
              type: 'web',
              toggled: false,
              children: [],
            });
          });
          return joined;
        })
          .catch(handleError);
      })
      .catch(handleError);
    // initial load
    } else {
      return sp.web
        .expand('Webs, Folders, RootFolder/Files')
        .select(
          'Id, Webs/Id, Webs/Title, Webs/ServerRelativeUrl, Folders/Name, Folders/UniqueId, Folders/ServerRelativeUrl, RootFolder/Files/ServerRelativeUrl, RootFolder/Files/Name, RootFolder/Files/UniqueId, RootFolder/Files/CustomizedPageStatus'
        )()
        .then((r: any) => {
          const joined: any[] = [];

          r.Folders.results.forEach(function (folder: any) {
            joined.push({
              id: folder.UniqueId,
              webId: r.Id,
              name: folder.Name,
              ServerRelativeUrl: folder.ServerRelativeUrl,
              type: 'folder',
              toggled: false,
              children: [],
            });
          });
          r.RootFolder.Files.results.forEach(function (file: any) {
            joined.push({
              id: file.UniqueId,
              webId: r.Id,
              name: file.Name,
              ServerRelativeUrl: file.ServerRelativeUrl,
              type: 'file',
              CustomizedPageStatus: file.CustomizedPageStatus,
            });
          });
          r.Webs.results.forEach(function (web: any) {
            joined.push({
              id: web.Id,
              webId: web.Id,
              name: web.Title,
              ServerRelativeUrl: web.ServerRelativeUrl,
              type: 'web',
              toggled: false,
              children: [],
            });
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
