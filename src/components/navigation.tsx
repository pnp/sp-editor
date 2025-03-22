import { FontIcon, Nav, ScrollablePane, TooltipDelay, TooltipHost, Text, Stack } from '@fluentui/react';
import { IonButton, IonButtons, IonContent, IonHeader, IonMenu, IonTitle, IonToggle, IonToolbar } from '@ionic/react';
import { DarkCustomizations, DefaultCustomizations } from '@fluentui/theme-samples';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { IRootState } from '../store';
import { setDarkMode, setLoading, setTheme } from '../store/home/actions';

export const FabricNav = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const navLinks = [
    {
      name: 'Home',
      url: '/',
      key: 'key1',
    },
    {
      name: 'Scriptlinks',
      url: '/scriptlinks',
      key: 'key2',
    },
    {
      name: 'PnP JS Console',
      url: '/pnpjsconsole',
      key: 'key3',
    },
    {
      name: 'Graph SDK Console',
      url: '/graphsdkconsole',
      key: 'key4',
    },
    {
      name: 'MGT React Playground',
      url: '/mgtconsole',
      key: 'key17',
      disabled: false,
    },
    {
      name: 'Web Properties',
      url: '/webproperties',
      key: 'key5',
    },
    {
      name: 'List Properties',
      url: '/listproperties',
      key: 'key6',
      disabled: false,
    },
    {
      name: 'SP Shooter',
      url: '/spshooter',
      key: 'key7',
      disabled: false,
    },
    {
      name: 'Webhooks',
      url: '/webhooks',
      key: 'key8',
      disabled: false,
    },
    {
      name: 'Search',
      url: '/search',
      key: 'key10',
      disabled: false,
    },
    {
      name: 'File Editor',
      url: '/fileexplorer',
      key: 'key9',
      disabled: false,
    },
    {
      name: 'Proxy',
      url: '/proxy',
      key: 'key18',
      disabled: false,
    },
    {
      name: 'Page editor',
      url: '/pageeditor',
      key: 'key11',
      disabled: false,
    },
    {
      name: 'Modern properties',
      url: '/modernproperties',
      key: 'key13',
      disabled: false,
    },
    {
      name: 'Site designs',
      url: '/sitedesigns',
      key: 'key14',
      disabled: false,
    },
    {
      name: 'Site scripts',
      url: '/sitescripts',
      key: 'key15',
      disabled: false,
    },
    {
      name: 'App catalog',
      url: '/appcatalog',
      key: 'key16',
      disabled: false,
    },
    {
      name: 'Tenant Properties',
      url: '/tenantproperties',
      key: 'key17',
    },
  ];

  const currentLink = navLinks.find((x) => x.url === document.location.pathname);
  const [selectedKey, setSelectedKey] = useState(currentLink?.key ?? 'key1');
  const { isDark } = useSelector((state: IRootState) => state.home);

  const toggleDarkTheme = () => {
    document.body.classList.toggle('dark', !isDark);
    dispatch(setTheme(!isDark ? DarkCustomizations : DefaultCustomizations));
    dispatch(setDarkMode(!isDark));
  };

  return (
    <IonMenu contentId="main">
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            SP Editor
            <Text style={{ marginLeft: 4 }}>v.{chrome.runtime.getManifest().version}</Text>
          </IonTitle>
          <IonButtons slot="end">
            <TooltipHost content={!isDark ? 'Switch to Dark Mode' : 'Switch to Light Mode'} delay={TooltipDelay.zero}>
              <IonToggle onClick={toggleDarkTheme} color="success" checked={isDark} />
            </TooltipHost>
            <TooltipHost content="Reload SP Editor" delay={TooltipDelay.zero}>
              <IonButton onClick={() => document.location.reload()}>
                <FontIcon iconName="Refresh" />
              </IonButton>
            </TooltipHost>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent no-bounce>
        <ScrollablePane>
          <Nav
            selectedKey={selectedKey}
            onLinkClick={(event, element) => {
              if (event && element) {
                const menu = document.querySelector('ion-menu') as any;
                menu && menu.close();
                event.preventDefault();
                if (element.key && selectedKey !== element.key) {
                  dispatch(setLoading(false));
                  navigate(element.url);
                  setSelectedKey(element.key);
                }
              }
            }}
            groups={[
              {
                links: navLinks,
              },
            ]}
          />
        </ScrollablePane>
      </IonContent>
    </IonMenu>
  );
};
