import { IonContent, IonPage } from '@ionic/react';
import React from 'react';
import Header from '../../components/header';
import LoadingSpinner from '../../components/loadingSpinner';
import SitePropertiesCommands from './components/commands';
import SitePropertiesEditPanel from './components/editpanel';
import SitePropertiesList from './components/sitepropertieslist';
import SitePropertiesNewPanel from './components/newpanel';

const SiteProperties = () => {
  return (
    <IonPage>
      <Header title={'Site Properties'} showOnLoad={false} headline="Header here" content="instructions here" />
      {/* Actions menu */}
      <SitePropertiesCommands />
      <IonContent>
        <LoadingSpinner />
        {/* List of site properties */}
        <SitePropertiesList />
        {/* Panel to edit site property */}
        <SitePropertiesEditPanel />
        {/* Panel to create new site property */}
        <SitePropertiesNewPanel />
      </IonContent>
    </IonPage>
  );
};

export default SiteProperties;
