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

  // Notify background script about livereload state changes
  useEffect(() => {
    chrome.runtime.sendMessage({
      type: 'SET_LIVERELOAD',
      enabled: livereload
    });
  }, [livereload]);

  const toggleLivereload = () => {
    const newState = !livereload;
    dispatch(setLiveReload(newState));
    
    // Inject/remove on current tab immediately
    chrome.runtime.sendMessage({
      type: 'TOGGLE_LIVERELOAD',
      action: newState ? 'add' : 'remove',
      tabId: chrome.devtools.inspectedWindow.tabId
    });
  };

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
              onClick={toggleLivereload}
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