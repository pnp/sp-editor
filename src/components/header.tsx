import { DirectionalHint, FontIcon, mergeStyles, TeachingBubble } from '@fluentui/react';
import { IonButtons, IonHeader, IonMenuButton, IonMenuToggle, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import coffee from './default-yellow.png';

const Header = ({ title, showOnLoad, headline, content }: HeaderProps) => {
  const [showInfo, setShowInfo] = React.useState(showOnLoad);

  const iconClass = mergeStyles({
    fontSize: 25,
    marginTop: 6,
    cursor: 'pointer',
  });
  const CalloutProps = { directionalHint: DirectionalHint.leftCenter };

  return (
    <IonHeader>
      <IonToolbar>
        <IonButtons>
          <IonMenuToggle>
            <IonMenuButton />
          </IonMenuToggle>{' '}
          <IonTitle>{title}</IonTitle>
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
