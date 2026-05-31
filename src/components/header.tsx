import { DirectionalHint, FontIcon, IconButton, Label, mergeStyles, Stack, TeachingBubble, TooltipHost } from '@fluentui/react';
import { IonButtons, IonHeader, IonMenuButton, IonMenuToggle, IonTitle, IonToggle, IonToolbar } from '@ionic/react';
import React, { useEffect } from 'react';
import coffee from './default-yellow.png';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../store';
import { setLiveReload } from '../store/home/actions';
import { setAiPanelOpen } from '../store/ai-assistant/actions';

const Header = ({ title, showOnLoad, headline, content }: HeaderProps) => {
  const [showInfo, setShowInfo] = React.useState(showOnLoad);
  const { livereload } = useSelector((state: IRootState) => state.home)
  const { isOpen: aiPanelOpen } = useSelector((state: IRootState) => state.aiAssistant)
  const dispatch = useDispatch()

  const iconClass = mergeStyles({
    fontSize: 25,
    marginTop: 6,
    cursor: 'pointer',
  });
  const CalloutProps = { directionalHint: DirectionalHint.leftCenter };

  useEffect(() => {
    const handleTabUpdate = (tabId: number, changeInfo: chrome.tabs.TabChangeInfo, tab: chrome.tabs.Tab) => {
      if (changeInfo.status === 'complete' && tab.active) {
        chrome.scripting.executeScript({
          target: { tabId: tabId },
          world: 'MAIN',
          func: () => {
            let script = document.createElement('script');
            script.src = "https://localhost:35729/livereload.js?snipver=1";
            document.head.appendChild(script);
            return true;
          },
        });
      }
    };

    if (livereload) {
      chrome.tabs.onUpdated.addListener(handleTabUpdate);
    } else {
      chrome.tabs.onUpdated.removeListener(handleTabUpdate);
    }

    // Cleanup the listener on component unmount
    return () => {
      chrome.tabs.onUpdated.removeListener(handleTabUpdate);
    };
  }, [livereload]);

  return (
    <IonHeader>
      <IonToolbar>
        <IonButtons>
          <IonMenuToggle>
            <IonMenuButton />
          </IonMenuToggle>{' '}
          <IonTitle>{title}</IonTitle>
          <Stack
            tokens={{ childrenGap: 3 }}
            style={{ marginTop: '-7px' }}
            horizontalAlign="center"
            verticalAlign="start"
          >
            <Label style={{ marginRight: '10px', padding: 0 }}>SPFx livereload</Label>
            <IonToggle
              style={{
                marginRight: '10px',
              }}
              checked={livereload}
              onClick={() => {
                const executeOnTab = (tabId: number) => {
                  if (!livereload) {
                    chrome.scripting.executeScript({
                      target: { tabId },
                      world: 'MAIN',
                      func: () => {
                        let script = document.createElement('script');
                        script.src = "https://localhost:35729/livereload.js?snipver=1";
                        document.head.appendChild(script);
                        return true;
                      },
                    });
                  } else {
                    chrome.scripting.executeScript({
                      target: { tabId },
                      world: 'MAIN',
                      func: () => {
                        const script = document.querySelector('script[src="https://localhost:35729/livereload.js?snipver=1"]');
                        if (script) {
                          script.remove();
                        }
                        if ((window as any).LiveReload) {
                          (window as any).LiveReload.connector.disconnect()
                        }
                        return true;
                      },
                    });
                  }
                };

                // In DevTools panel, use chrome.devtools.inspectedWindow.tabId
                if (chrome.devtools?.inspectedWindow?.tabId) {
                  executeOnTab(chrome.devtools.inspectedWindow.tabId);
                } else {
                  // Fallback for popup or other contexts
                  chrome.tabs.query({ currentWindow: true, active: true }, (tabs: any) => {
                    if (tabs[0]?.id) {
                      executeOnTab(tabs[0].id);
                    }
                  });
                }
                dispatch(setLiveReload(!livereload));
              }}
              color="success"
            ></IonToggle>
          </Stack>
          <a href="https://buymeacoffee.com/speditor" target="_blank" rel="noopener noreferrer">
            <img src={coffee} alt="coffee" style={{ marginRight: '10px', height: '40px' }} />
          </a>{' '}
          {!aiPanelOpen && (
            <TooltipHost content="AI Assistant">
              <IconButton
                iconProps={{ iconName: 'Robot' }}
                ariaLabel="Open AI Assistant"
                onClick={() => dispatch(setAiPanelOpen(true))}
                styles={{ root: { marginRight: 10, height: 40, width: 40, fontSize: 20 } }}
              />
            </TooltipHost>
          )}
          {headline && content && (
            <div style={{ marginRight: '20px', display: 'flex', alignItems: 'center' }}>
              <FontIcon
                id={'buttonId'}
                iconName="Info"
                className={iconClass}
                onClick={() => {
                  setShowInfo(!showInfo);
                }}
              />

              {showInfo && (
                <TeachingBubble
                  target={`#buttonId`}
                  calloutProps={CalloutProps}
                  onDismiss={() => {
                    setShowInfo(false);
                  }}
                  headline={headline}
                >
                  {content}
                </TeachingBubble>
              )}
            </div>
          )}
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

interface HeaderProps {
  title?: string;
  showOnLoad?: boolean;
  headline?: string;
  content?: string;
}

export default Header;
