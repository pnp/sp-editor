import { IonContent, IonPage, IonHeader, IonToolbar } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IRootState } from "../../store";
import Header from "../../components/header";
import LoadingSpinner from "../../components/loadingSpinner";
import SearchCommands from "./components/commands";
import SearchResults from "./components/searchresults";
import CrawlLogCommands from "./components/CrawlLogCommands";
import CrawlLogResults from "./components/CrawlLogResults";
import { Pivot, PivotItem, MessageBar, MessageBarType } from "@fluentui/react";

const Search = () => {
  const { isDark } = useSelector((state: IRootState) => state.home);
  const [selectedPivot, setSelectedPivot] = useState<string>("search");
  const [isAdminSite, setIsAdminSite] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if current tab is on admin site for crawl log
    chrome.devtools.inspectedWindow.eval(
      "window.location.href",
      (result: string, isException) => {
        if (!isException && result) {
          setIsAdminSite(result.includes("-admin.sharepoint.com"));
        }
      }
    );
  }, []);

  return (
    <IonPage>
      <Header title={"Search"} showOnLoad={false} headline='' content=''/>
      <IonHeader>
        <IonToolbar style={{ '--background': isDark ? '#1e1e1e' : '#ffffff' } as React.CSSProperties}>
          <Pivot
            selectedKey={selectedPivot}
            onLinkClick={(item) => item && setSelectedPivot(item.props.itemKey || "search")}
            styles={{ 
              root: { 
                marginLeft: 16,
              } 
            }}
          >
            <PivotItem headerText="Search" itemKey="search" />
            <PivotItem headerText="Crawl Log" itemKey="crawllog" />
          </Pivot>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div style={{ display: 'flex', height: '100%', position: 'relative' }}>
          <div style={{ 
            flex: 1, 
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            height: '100%',
          }}>
            <LoadingSpinner />

            {selectedPivot === "search" && (
              <>
                <div style={{ 
                  flexShrink: 0, 
                  position: 'sticky', 
                  top: 0, 
                  zIndex: 1,
                  backgroundColor: isDark ? '#1e1e1e' : '#ffffff',
                }}>
                  <SearchCommands />
                </div>
                <div style={{ flex: 1, overflow: 'auto' }}>
                  <SearchResults />
                </div>
              </>
            )}

            {selectedPivot === "crawllog" && (
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                {isAdminSite === false && (
                  <MessageBar 
                    messageBarType={MessageBarType.warning}
                    isMultiline={true}
                    styles={{ root: { margin: '8px 16px' } }}
                  >
                    <strong>Admin site required:</strong> You must be on the SharePoint Admin Center 
                    (https://&lt;tenant&gt;-admin.sharepoint.com) to access crawl logs. 
                    Navigate to your admin site and try again.
                  </MessageBar>
                )}
                {isAdminSite !== false && (
                  <>
                    <CrawlLogCommands isDark={isDark} />
                    <CrawlLogResults isDark={isDark} />
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Search;
