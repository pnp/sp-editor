import { useEffect, useState, useCallback } from 'react';
import { Label, Pivot, PivotItem } from '@fluentui/react';

import './popup.css';
//import { initializeIcons } from '@fluentui/font-icons-mdl2';
import Actions from './Components/Actions';
import ContextInfoPropertiesList, { ICtxInfoProperty } from './Components/ContextInfoPropertiesList';
import QuickLinkList from './Components/QuickLinkList';
import LoadTeamsDebug from './Components/LoadTeamsDebug';

//initializeIcons();

async function getTenantSettings(ctx: any) {
  const tenantSettings = await fetch(ctx.webAbsoluteUrl + '/_api/SP_TenantSettings_Current', {
    headers: {
      Accept: 'application/json;odata=nometadata',
      'Content-Type': 'application/json',
      'X-ClientService-ClientTag': 'SPEDITOR',
    },
  })
    .then((response) => response.json());
    return tenantSettings;
}

async function getPlo(ctx: any) {
  const plo = await fetch(
    ctx.webAbsoluteUrl +
      "/_api/web/getFileByServerRelativeUrl('" +
      ctx.serverRequestPath +
      "')/listItemAllFields?$select=PageLayoutType,PromotedState,Id",
    {
      method: 'get',
      headers: {
        Accept: 'application/json;odata=nometadata',
        'Content-Type': 'application/json',
        'X-ClientService-ClientTag': 'SPEDITOR',
      },
    }
  ).then((response) => response.json());
  return plo;
}

interface NoContextProps {
  message: string;
}

const NoContext: React.FC<NoContextProps> = ({ message }) => {
  return (
    <Label style={{ marginTop: 100, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{message}</Label>
  );
};

const SPMessage = 'Please browse to SharePoint site';
const TeamsMessage = 'Please browse to Teams';

// Detect if running in popup or side panel
const getMode = (): 'popup' | 'panel' => {
  const hash = window.location.hash;
  if (hash.includes('mode=panel')) {
    return 'panel';
  }
  return 'popup';
};

const PopUp = () => {
  const [tabId, setTabId] = useState<number>();
  const [tabUrl, setTabUrl] = useState<string>('');
  const [ctx, setCtx] = useState<any>(null);
  const [properties, setProperties] = useState<ICtxInfoProperty[]>([]);
  const [appCatalogUrl, setAppCatalogUrl] = useState<string>('');
  const [plo, setPlo] = useState<any>(null);
  const [isTeams, setIsTeams] = useState<any>(null);
  const [mode] = useState<'popup' | 'panel'>(getMode);
  const isPanel = mode === 'panel';

  function checkTeamsContext() {
    let tabFrame = document.querySelector("iframe[name='embedded-page-container']") as HTMLIFrameElement | null;
    if (tabFrame) {
      return true;
    } else {
      return false;
    }
  }

  const loadContextData = useCallback((currentTabId: number, currentTabUrl: string) => {
    // Reset state when loading new context
    setCtx(null);
    setProperties([]);
    setAppCatalogUrl('');
    setPlo(null);
    setIsTeams(null);
    setTabUrl(currentTabUrl);

    chrome.scripting
      .executeScript({
        target: { tabId: currentTabId },
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
        if (injectionResults[0].result) {
          var ctx = injectionResults[0].result;
          setCtx(ctx);
          const props: ICtxInfoProperty[] = Object.entries(injectionResults[0].result)
            .map((entry) => {
              const key = entry[0];
              const value = JSON.stringify(entry[1]).replace(/^"|"$/g, '');
              return { property: key, value: value };
            })
            .sort((a, b) => a.property.localeCompare(b.property));

          setProperties(props);
          chrome.scripting.executeScript({
            target: { tabId: currentTabId },
            world: 'MAIN',
            func: getTenantSettings,
            args: [ctx]
          }).then((r) => {
            if (r[0].result) {
              setAppCatalogUrl(r[0].result.CorporateCatalogUrl);
            }
          });

          if (ctx.webAbsoluteUrl && ctx.serverRequestPath && ctx.pageListId && ctx.pageItemId > -1) {
            chrome.scripting.executeScript({
              target: { tabId: currentTabId },
              world: 'MAIN',
              func: getPlo,
              args: [ctx]
            }).then((r) => {
              if (r[0].result) {
                setPlo(r[0].result);
              }
            });
          }
        }
      })
      .catch(() => {
        // Scripting failed, likely not a valid page
        setCtx(null);
      });

    chrome.scripting
      .executeScript({
        target: { tabId: currentTabId },
        world: 'MAIN',
        args: [],
        func: checkTeamsContext,
      })
      .then((injectionResults) => {
        if (injectionResults[0].result) {
          setIsTeams(injectionResults[0].result);
        }
      })
      .catch(() => {
        setIsTeams(false);
      });
  }, []);

  // load initial data
  useEffect(() => {
    chrome.tabs.query({ currentWindow: true, active: true }, (tabs: any) => {
      const currentTabId = tabs[0].id;
      setTabId(currentTabId);
      loadContextData(currentTabId, tabs[0].url);
    });
  }, [loadContextData]);

  // Listen for tab URL changes (navigation within the same tab)
  useEffect(() => {
    const handleTabUpdated = (updatedTabId: number, changeInfo: chrome.tabs.TabChangeInfo, tab: chrome.tabs.Tab) => {
      // Only react to URL changes on the current tab, and when the page has finished loading
      if (tabId && updatedTabId === tabId && changeInfo.status === 'complete' && tab.url) {
        // Check if URL actually changed
        if (tab.url !== tabUrl) {
          loadContextData(tabId, tab.url);
        }
      }
    };

    const handleTabActivated = (activeInfo: chrome.tabs.TabActiveInfo) => {
      // User switched to a different tab
      chrome.tabs.get(activeInfo.tabId, (tab) => {
        if (tab && tab.url) {
          setTabId(activeInfo.tabId);
          loadContextData(activeInfo.tabId, tab.url);
        }
      });
    };

    chrome.tabs.onUpdated.addListener(handleTabUpdated);
    chrome.tabs.onActivated.addListener(handleTabActivated);

    return () => {
      chrome.tabs.onUpdated.removeListener(handleTabUpdated);
      chrome.tabs.onActivated.removeListener(handleTabActivated);
    };
  }, [tabId, tabUrl, loadContextData]);

  return (
    <div style={{ width: isPanel ? '100%' : '400px', minWidth: isPanel ? 'auto' : '400px' }}>
      <Pivot 
        overflowBehavior="menu"
        styles={{
          root: { width: '100%' },
        }}
      >
        <PivotItem headerText="Quick links">
          {ctx ? (
            <QuickLinkList ctx={ctx} appCatalogUrl={appCatalogUrl} tabUrl={tabUrl} />
          ) : (
            <NoContext message={SPMessage} />
          )}
        </PivotItem>
        <PivotItem headerText="_spPageContextInfo">
          {ctx ? <ContextInfoPropertiesList properties={properties} /> : <NoContext message={SPMessage} />}
        </PivotItem>
        <PivotItem headerText="Actions">
          {plo && tabId ? <Actions ctx={ctx} plo={plo} tabId={tabId} /> : <NoContext message={SPMessage} />}
        </PivotItem>
        <PivotItem headerText="Teams">
          {isTeams && tabId ? <LoadTeamsDebug tabId={tabId} /> : <NoContext message={TeamsMessage} />}
        </PivotItem>
      </Pivot>
    </div>
  );
};

export default PopUp;
