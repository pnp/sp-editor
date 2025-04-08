import { useState, useEffect } from 'react';

export enum FetchStatus {
  idle = 'idle',
  loading = 'loading',
  loaded = 'loaded',
  error = 'error',
}

export interface ISPContextFetch {
  adminUrl: string;
  isAdminSite: boolean;
  status: FetchStatus;
}

export default function useSPContext(): ISPContextFetch {
  const [tabUrl, setTabUrl] = useState<string>('');
  const [ctx, setCtx] = useState<any>(null);

  const [status, setStatus] = useState<FetchStatus>(FetchStatus.idle);
  const adminUrl =
    ctx?.isSPO && ctx.portalUrl
      ? `${ctx.portalUrl.toLocaleLowerCase().replace('.sharepoint.', '-admin.sharepoint.')}`
      : '';

  const isAdminSite = !!(adminUrl && tabUrl.toLocaleLowerCase().indexOf(adminUrl?.toLocaleLowerCase()) > -1);

  useEffect(() => {
    setStatus(FetchStatus.loading);
    const fetchTabUrl = () => {
      chrome.tabs.query({ currentWindow: true, active: true }, (tabs: any) => {
        if (tabs[0]?.url) {
          setTabUrl(tabs[0].url);
        }
      });
    };
    const fetchSPContext = (tabId: number) => {
      chrome.scripting
        .executeScript({
          target: { tabId },
          world: 'MAIN',
          func: () => {
            return (
              (window as any)._spPageContextInfo ||
              ((window as any).moduleLoaderPromise
                ? (window as any).moduleLoaderPromise.then((e: any) => {
                    return ((window as any)._spPageContextInfo = e.context._pageContext._legacyPageContext);
                  })
                : null)
            );
          },
        })
        .then((injectionResults) => {
          if (injectionResults[0]?.result) {
            setCtx(injectionResults[0].result);
            setStatus(FetchStatus.loaded);
          }
        })
        .catch((error) => {
          console.error('Error executing script:', error);
          setStatus(FetchStatus.error);
        });
    };

    chrome.tabs.query({ currentWindow: true, active: true }, (tabs: any) => {
      if (tabs[0]?.id) {
        fetchTabUrl();
        fetchSPContext(tabs[0].id);
      }
    });
  }, []);

  return { adminUrl, isAdminSite, status };
}
