import { IonContent, IonPage } from '@ionic/react';
import React from 'react';
import Header from '../../components/header';
import LoadingSpinner from '../../components/loadingSpinner';
import SitePropertiesCommands from './components/commands';
import SitePropertiesEditPanel from './components/editpanel';
import SitePropertiesList from './components/sitepropertieslist';
import useSPContext, { FetchStatus } from '../../dataproviders/useSPContext';
import AdminFeaturePage from '../adminfeature/AdminFeaturePage';

const SiteProperties = () => {
  const { status, isAdminSite } = useSPContext();

  if (status === FetchStatus.loaded) {
    if (!isAdminSite) {
      return <AdminFeaturePage />;
    } else {
      return (
        <IonPage>
          <Header
            title={'Site Properties'}
            showOnLoad={false}
            headline="Site properties"
            content="This feature is only supported in the SharePoint admin site. Please open the SharePoint admin site to use this feature."
          />
          {/* Actions menu */}
          <SitePropertiesCommands />
          <IonContent>
            <LoadingSpinner />
            {/* List of site properties */}
            <SitePropertiesList />
            {/* Panel to edit site property */}
            <SitePropertiesEditPanel />
          </IonContent>
        </IonPage>
      );
    }
  } else {
    return <></>;
  }
};

export default SiteProperties;
