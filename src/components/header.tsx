import { DirectionalHint, FontIcon, Label, mergeStyles, Stack, TeachingBubble } from '@fluentui/react';
import { IonButtons, IonHeader, IonMenuButton, IonMenuToggle, IonTitle, IonToggle, IonToolbar } from '@ionic/react';
import React, { useEffect } from 'react';
import coffee from './default-yellow.png';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../store';
import { setLiveReload } from '../store/home/actions';

const Header = ({ title, showOnLoad, headline, content }: HeaderProps) => {
  const [showInfo, setShowInfo] = React.useState(showOnLoad);
  const { livereload } = useSelector((state: IRootState) => state.home)
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
                if (!livereload) {
                  chrome.tabs.query({ currentWindow: true, active: true }, (tabs: any) => {
                    chrome.scripting.executeScript({
                      target: { tabId: tabs[0].id },
                      world: 'MAIN',
                      func: () => {
                        let script = document.createElement('script');
                        script.src = "https://localhost:35729/livereload.js?snipver=1";
                        document.head.appendChild(script);
                        return true;
                      },
                    });
                  });
                } else {
                  chrome.tabs.query({ currentWindow: true, active: true }, (tabs: any) => {
                    chrome.scripting.executeScript({
                      target: { tabId: tabs[0].id },
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
