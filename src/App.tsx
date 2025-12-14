import { useEffect } from 'react';
import PnPjsConsole from './pages/pnpjsconsole';

import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';

import './App.css';
import { FabricNav } from './components/navigation';
import HomePage from './pages/home/homePage';
import ScriptLinks from './pages/scriptlinks';
import { Route, Routes, HashRouter } from 'react-router-dom';

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

setupIonicReact();

const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

document.body.style.minWidth = 100 + '%';
document.body.style.minHeight = 100 + '%';

const App = () => {
  const { theme } = useSelector((state: IRootState) => state.home);

  if (document.location.hash === '#/') menuController.toggle(); // open menu when extension loads

  const dispatch = useDispatch();

  useEffect(() => {
    const toggleDarkTheme = (shouldAdd: boolean) => {
      document.body.classList.toggle('dark', shouldAdd);
      dispatch(setTheme(shouldAdd ? DarkCustomizations : DefaultCustomizations));
      dispatch(setDarkMode(shouldAdd));
    };

    // toggleDarkTheme(prefersDark.matches)
    // this will set the theme according the system preferences
    // now we default to dark (true)
    toggleDarkTheme(true);
    prefersDark.addListener((mediaQuery) => toggleDarkTheme(mediaQuery.matches));
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
                <Route path="/" element={<HomePage />} />
                <Route path="/index.html" element={<HomePage />} />
                <Route path="/scriptlinks" element={<ScriptLinks />} />
                <Route path="/pnpjsconsole" element={<PnPjsConsole />} />
                <Route path="/webproperties" element={<WebProperties />} />
                <Route path="/listproperties" element={<ListProperties />} />
                <Route path="/siteproperties" element={<SiteProperties />} />
                <Route path="/adminfeatures" element={<AdminFeaturePage />} />
                <Route path="/tenantproperties" element={<TenantProperties />} />
                <Route path="/webhooks" element={<Webhooks />} />
                <Route path="/spshooter" element={<SPShooter />} />
                <Route path="/graphsdkconsole" element={<GraphSDKConsole />} />
                <Route path="/mgtconsole" element={<MGTConsole />} />
                <Route path="/search" element={<Search />} />
                <Route path="/fileexplorer" element={<FileExplorer />} />
                <Route path="/proxy" element={<Proxy />} />
                <Route path="/queryBuilder" element={<QueryBuilder />} />
                <Route path="/customizers" element={<Customizers />} />
                <Route path="/customizers/fieldcustomizers" element={<FieldCustomizersPage />} />
                <Route path="/customizers/formcustomizers" element={<FormCustomizersPage />} />
                <Route path="/siteprovisioning" element={<SiteProvisioningPage />} />
                <Route path="*" element={<InfoPage />} /> {/* Catch-all route */}
              </Routes>
            </IonRouterOutlet>
            <MessageBar />
          </HashRouter>
        </Customizer>
      </Fabric>
    </IonApp>
  );
};

export default App;
