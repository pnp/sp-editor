import { FontIcon, Nav, ScrollablePane, TooltipDelay, TooltipHost, Text, INavLink, INavLinkGroup } from '@fluentui/react';
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
  const location = useLocation();

  // Track expanded state for groups - start empty, will auto-expand based on selection
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

  const toggleGroup = (key: string) => {
    setExpandedGroups((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(key)) {
        newSet.delete(key);
      } else {
        newSet.add(key);
      }
      return newSet;
    });
  };

  // Helper to find parent key for a given path
  const findParentKey = (pathname: string, links: INavLink[]): string | null => {
    for (const link of links) {
      if (link.links && link.links.length > 0) {
        const childMatch = link.links.find((child) => child.url && pathname.startsWith(child.url));
        if (childMatch) {
          return link.key || null;
        }
      }
    }
    return null;
  };

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
      { 
        name: 'Customizers', 
        url: '', 
        key: 'customizersKey',
        isExpanded: expandedGroups.has('customizersKey'),
        links: [
          { name: 'Field Customizers', url: '/customizers/fieldcustomizers', key: 'fieldCustomizersKey' },
          { name: 'Form Customizers', url: '/customizers/formcustomizers', key: 'formCustomizersKey' },
        ],
      },
      { name: 'Proxy', url: '/proxy', key: 'proxyKey', disabled: false },
      { name: 'Tenant Properties', url: '/tenantproperties', key: 'tenantpropertiesKey' },
      {
        name: 'Admin section',
        key: 'adminSectionKey',
        url: '',
        isExpanded: expandedGroups.has('adminSectionKey'),
        links: [
          { name: 'Site Properties', url: '/siteproperties', key: 'sitepropertiesKey' },
        ],
      },
      { name: 'Query Builder', url: '/queryBuilder', key: 'queryBuilderKey', disabled: false },
      { name: 'Site Provisioning', url: '/siteprovisioning', key: 'siteprovisioningKey', disabled: false },
      { name: 'Page editor', url: '/pageeditor', key: 'pageeditorKey', disabled: false },
      { name: 'Modern properties', url: '/modernproperties', key: 'modernpropertiesKey', disabled: false },
      { name: 'App catalog', url: '/appcatalog', key: 'appcatalogKey', disabled: false },
    ],
    [expandedGroups]
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
    const flattenLinks = (links: INavLink[]): INavLink[] => {
      return links.reduce<INavLink[]>((acc, link) => {
        acc.push(link)
        if (link.links && link.links.length > 0) {
          acc.push(...flattenLinks(link.links))
        }
        return acc
      }, [])
    }

    const allLinks = flattenLinks(navLinks)
    
    let matched = allLinks
      .filter((link) => link.url && pathname?.startsWith(link.url))
      .sort((a, b) => b.url.length - a.url.length)[0]

    return matched ? matched.key ?? 'homeKey' : navLinks[0]?.key ?? 'homeKey'
  }

  // Auto-expand parent group when navigating to a child
  useEffect(() => {
    const parentKey = findParentKey(location.pathname, navLinks);
    if (parentKey && !expandedGroups.has(parentKey)) {
      setExpandedGroups((prev) => {
        const newSet = new Set(Array.from(prev));
        newSet.add(parentKey);
        return newSet;
      });
    }
    setSelectedKey(getKeyFromPath(location.pathname, navLinks));
  }, [location.pathname]);

  const onRenderLink = (props?: INavLink, defaultRender?: (props?: INavLink) => JSX.Element | null): JSX.Element | null => {
    if (!props) return null;

    // If this is a parent item with sub-links and no URL, make the whole thing toggle
    if (props.links && props.links.length > 0 && !props.url) {
      return (
        <div
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleGroup(props.key!);
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            cursor: 'pointer',
          }}
        >
          <span>{props.name}</span>
        </div>
      );
    }

    // Default rendering for regular links
    return defaultRender ? defaultRender(props) : null;
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
            onRenderLink={onRenderLink}
            onLinkClick={(event, element) => {
              if (event && element) {
                event.preventDefault();
                
                // Skip parent items - they're handled by onRenderLink
                if (element.links && element.links.length > 0 && !element.url) {
                  return;
                }
                
                const menu = document.querySelector('ion-menu') as any;
                menu && menu.close();
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
