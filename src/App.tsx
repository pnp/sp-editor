import { useEffect } from 'react';
import PnPjsConsole from './pages/pnpjsconsole';

import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';

import './App.css';
import { FabricNav } from './components/navigation';
import HomePage from './pages/home/homePage';
import ScriptLinks from './pages/scriptlinks';
import { Route, Routes, HashRouter } from 'react-router-dom';
import { trackDevToolsOpen } from './services/analytics';
import { loadApiKey } from './services/storage/chromeStorageService';
import { setAuthState } from './store/ai-assistant-auth/actions';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
//import "@ionic/react/css/palettes/dark.system.css";

/* Theme variables */
import './theme/variables.css';

import { Fabric } from '@fluentui/react';
import { Customizer } from '@fluentui/react/lib/Utilities';

import { DarkCustomizations, DefaultCustomizations } from '@fluentui/theme-samples';
import { useDispatch, useSelector } from 'react-redux';
import MessageBar from './components/messageBar';
import GraphSDKConsole from './pages/graphsdkconsole';
import ListProperties from './pages/listproperties';
import SiteProperties from './pages/siteproperties';
import MGTConsole from './pages/mgtconsole';
import QueryBuilder from './pages/queryBuilder';
import SPShooter from './pages/spshooter';
import Webhooks from './pages/webhooks';
import WebProperties from './pages/webproperties';
import TenantProperties from './pages/tenantproperties';
import AdminFeaturePage from './pages/adminfeature/AdminFeaturePage';
import { IRootState } from './store';
import { setDarkMode, setTheme } from './store/home/actions';
import Search from './pages/search';
import { menuController } from '@ionic/core';
import './index.css';
import FileExplorer from './pages/fileexplorer';
import InfoPage from './pages/Info/infoPage';
import Proxy from './pages/proxy';
import Customizers from './pages/customizers';
import FieldCustomizersPage from './pages/customizers/fieldcustomizers';
import FormCustomizersPage from './pages/customizers/formcustomizers';
import SiteProvisioningPage from './pages/siteprovisioning';
import ThemeDesigner from './pages/themedesigner';
import PageWebParts from './pages/pagewebparts';
import AiAssistantPanel from './components/aiAssistantPanel/aiAssistantPanel';
import { FEATURE_CONTEXTS } from './config/featureContext';

setupIonicReact();

const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

document.body.style.minWidth = 100 + '%';
document.body.style.minHeight = 100 + '%';

const App = () => {
  const { theme } = useSelector((state: IRootState) => state.home);

  const featureElementByKey: Record<string, JSX.Element> = {
    home: <HomePage />,
    scriptlinks: <ScriptLinks />,
    pnpjsconsole: <PnPjsConsole />,
    webproperties: <WebProperties />,
    listproperties: <ListProperties />,
    siteproperties: <SiteProperties />,
    adminfeatures: <AdminFeaturePage />,
    tenantproperties: <TenantProperties />,
    webhooks: <Webhooks />,
    spshooter: <SPShooter />,
    graphsdkconsole: <GraphSDKConsole />,
    mgtconsole: <MGTConsole />,
    search: <Search />,
    fileexplorer: <FileExplorer />,
    proxy: <Proxy />,
    queryBuilder: <QueryBuilder />,
    customizers: <Customizers />,
    fieldCustomizers: <FieldCustomizersPage />,
    formCustomizers: <FormCustomizersPage />,
    siteprovisioning: <SiteProvisioningPage />,
    themedesigner: <ThemeDesigner />,
    pagewebparts: <PageWebParts />,
  }

  if (document.location.hash === '#/') menuController.toggle(); // open menu when extension loads

  const dispatch = useDispatch();

  useEffect(() => {
    const toggleDarkTheme = (shouldAdd: boolean) => {
      document.body.classList.toggle('dark', shouldAdd);
      dispatch(setTheme(shouldAdd ? DarkCustomizations : DefaultCustomizations));
      dispatch(setDarkMode(shouldAdd));
    };

    // Track DevTools extension opened
    trackDevToolsOpen();

    // toggleDarkTheme(prefersDark.matches)
    // this will set the theme according the system preferences
    // now we default to dark (true)
    toggleDarkTheme(true);
    prefersDark.addListener((mediaQuery) => toggleDarkTheme(mediaQuery.matches));
  }, [dispatch]);

  useEffect(() => {
    // Initialize AI Assistant auth from Chrome storage
    const initializeAuth = async () => {
      const apiKey = await loadApiKey();
      if (apiKey) {
        dispatch(
          setAuthState({
            isAuthenticated: true,
            apiKey: apiKey,
            user: null,
          })
        );
      }
    };
    initializeAuth();
  }, [dispatch]);

  useEffect(() => {
    const menu = document.querySelector('ion-menu') as any;
    if (menu) {
      menu.open();
    }
  }, []);

  return (
    <IonApp>
      <Fabric>
        <Customizer {...theme}>
          <HashRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <FabricNav />
            <IonRouterOutlet id="main">
              <Routes>
                {FEATURE_CONTEXTS.flatMap((feature) =>
                  feature.routes.map((routePath) => (
                    <Route
                      key={`${feature.key}:${routePath}`}
                      path={routePath}
                      element={featureElementByKey[feature.key] || <InfoPage />}
                    />
                  ))
                )}
                <Route path="*" element={<InfoPage />} /> {/* Catch-all route */}
              </Routes>
            </IonRouterOutlet>
            <MessageBar />
            <AiAssistantPanel />
          </HashRouter>
        </Customizer>
      </Fabric>
    </IonApp>
  );
};

export default App;
