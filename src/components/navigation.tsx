import { FontIcon, Nav, ScrollablePane, TooltipDelay, TooltipHost, Text, INavLink } from '@fluentui/react';
import { IonButton, IonButtons, IonContent, IonHeader, IonMenu, IonTitle, IonToggle, IonToolbar } from '@ionic/react';
import { DarkCustomizations, DefaultCustomizations } from '@fluentui/theme-samples';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

import { IRootState } from '../store';
import { setDarkMode, setLoading, setTheme } from '../store/home/actions';

export const FabricNav = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const navLinks: INavLink[] = React.useMemo(
    () => [
      { name: 'Home', url: '/', key: 'homeKey' },
      { name: 'Scriptlinks', url: '/scriptlinks', key: 'scriptlinksKey' },
      { name: 'PnP JS Console', url: '/pnpjsconsole', key: 'pnpjsconsoleKey' },
      { name: 'Graph SDK Console', url: '/graphsdkconsole', key: 'graphsdkconsoleKey' },
      { name: 'MGT React Playground', url: '/mgtconsole', key: 'mgtconsoleKey', disabled: false },
      { name: 'Web Properties', url: '/webproperties', key: 'webpropertiesKey' },
      { name: 'List Properties', url: '/listproperties', key: 'listpropertiesKey', disabled: false },
      { name: 'SP Shooter', url: '/spshooter', key: 'spshooterKey', disabled: false },
      { name: 'Webhooks', url: '/webhooks', key: 'webhooksKey', disabled: false },
      { name: 'Search', url: '/search', key: 'searchKey', disabled: false },
      { name: 'File Editor', url: '/fileexplorer', key: 'fileexplorerKey', disabled: false },
      { name: 'Proxy', url: '/proxy', key: 'proxyKey', disabled: false },
      { name: 'Tenant Properties', url: '/tenantproperties', key: 'tenantpropertiesKey' },
      {
        name: 'Admin section',
        key: 'adminSectionKey',
        url: '/adminfeatures',
        links: [
          { name: 'Site Properties', url: '/siteproperties', key: 'sitepropertiesKey' },
        ],
      },
      { name: 'Query Builder', url: '/queryBuilder', key: 'queryBuilderKey', disabled: false },
      { name: 'Page editor', url: '/pageeditor', key: 'pageeditorKey', disabled: false },
      { name: 'Modern properties', url: '/modernproperties', key: 'modernpropertiesKey', disabled: false },
      { name: 'Site designs', url: '/sitedesigns', key: 'sitedesignsKey', disabled: false },
      { name: 'Site scripts', url: '/sitescripts', key: 'sitescriptsKey', disabled: false },
      { name: 'App catalog', url: '/appcatalog', key: 'appcatalogKey', disabled: false },
    ],
    []
  );

  const currentLink = navLinks.find((x) => x.url === document.location.pathname);
  const [selectedKey, setSelectedKey] = useState(currentLink?.key ?? 'homeKey');
  const { isDark } = useSelector((state: IRootState) => state.home);

  const toggleDarkTheme = () => {
    document.body.classList.toggle('dark', !isDark);
    dispatch(setTheme(!isDark ? DarkCustomizations : DefaultCustomizations));
    dispatch(setDarkMode(!isDark));
  };

  function getKeyFromPath(pathname: string | undefined, navLinks: INavLink[]): string {
    let matched = navLinks
      .filter((link) => pathname?.startsWith(link.url))
      .sort((a, b) => b.url.length - a.url.length)[0];

    return matched ? matched.key ?? 'homeKey' : navLinks[0]?.key ?? 'homeKey';
  }

  const location = useLocation();

  useEffect(() => {
    setSelectedKey(getKeyFromPath(location.pathname, navLinks));
  }, [location.pathname, navLinks]);

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
