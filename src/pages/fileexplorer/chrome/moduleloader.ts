import * as SP from '@pnp/sp/presets/all';
import * as Logging from '@pnp/logging';
import * as Queryable from '@pnp/queryable';

export function moduleLoader(extPath: string) {
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