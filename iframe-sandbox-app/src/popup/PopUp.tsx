import { useEffect, useState } from 'react';
import { Label, Pivot, PivotItem } from '@fluentui/react'

import './popup.css';
import { initializeIcons } from '@fluentui/font-icons-mdl2';
import Actions from './Components/Actions';
import ContextInfoPropertiesList, { ICtxInfoProperty } from './Components/ContextInfoPropertiesList';
import QuickLinkList from './Components/QuickLinkList';

initializeIcons();

const NoContext = () =>
  <Label
    style={{ marginTop: 100, display: "flex", justifyContent: "center", alignItems: "center" }}>
    Please browse to SharePoint site
  </Label>

const PopUp = () => {

  const [tabId, setTabId] = useState<number>();
  const [tabUrl, setTabUrl] = useState<string>('');
  const [ctx, setCtx] = useState<any>(null);
  const [properties, setProperties] = useState<ICtxInfoProperty[]>([]);
  const [appCatalogUrl, setAppCatalogUrl] = useState<string>('');
  const [plo, setPlo] = useState<any>(null);


  // load initial data
  useEffect(() => {
    chrome.tabs.query({ currentWindow: true, active: true }, (tabs: any) => {
      setTabId(tabs[0].id);
      setTabUrl(tabs[0].url);
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        world: 'MAIN',
        func: () => {
          return (window as any)._spPageContextInfo || (window as any).moduleLoaderPromise ? (window as any).moduleLoaderPromise.then((e: any) => {
            return (window as any)._spPageContextInfo = e.context._pageContext._legacyPageContext;
          }) : null;
        },
      }).then(injectionResults => {
        if (injectionResults[0].result) {
          var ctx = injectionResults[0].result;
          setCtx(ctx);
          const props: ICtxInfoProperty[] = Object.entries(injectionResults[0].result).map(entry => {
            const key = entry[0];
            const value = JSON.stringify(entry[1]).replace(/^"|"$/g, '');
            return { property: key, value: value };
          }).sort((a, b) => a.property.localeCompare(b.property));

          setProperties(props)

          fetch(ctx.webAbsoluteUrl + '/_api/SP_TenantSettings_Current', {
            headers: {
              'Accept': 'application/json;odata=nometadata',
              'Content-Type': 'application/json',
              'X-ClientService-ClientTag': 'SPEDITOR'
            }
          })
            .then(response => response.json())
            .then((r) => {
              setAppCatalogUrl(r.CorporateCatalogUrl);
            });

          if (ctx.webAbsoluteUrl && ctx.serverRequestPath && ctx.pageListId && ctx.pageItemId > -1) {

            fetch(ctx.webAbsoluteUrl + "/_api/web/getFileByServerRelativeUrl('" + ctx.serverRequestPath + "')/listItemAllFields?$select=PageLayoutType,PromotedState", {
              method: 'get',
              headers: {
                'Accept': 'application/json;odata=nometadata',
                'Content-Type': 'application/json',
                'X-ClientService-ClientTag': 'SPEDITOR'
              }
            })
              .then(response => response.json())
              .then((r) => {
                setPlo(r);
              });
          }
        }
      });
    })
  }, [])

  return (
    <Pivot style={{ width: '400px' }}>
      <PivotItem headerText="Quick links">
        {ctx ? <QuickLinkList ctx={ctx} appCatalogUrl={appCatalogUrl} tabUrl={tabUrl} />
          : <NoContext />}
      </PivotItem>
      <PivotItem headerText="_spPageContextInfo">
        {ctx ? <ContextInfoPropertiesList properties={properties} />
          : <NoContext />}
      </PivotItem>
      <PivotItem headerText="Actions">
        {plo && tabId? <Actions ctx={ctx} plo={plo} tabId={tabId} />
          : <NoContext />}
      </PivotItem>
    </Pivot>)
}

export default PopUp;