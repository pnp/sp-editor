import { IonContent, IonPage } from '@ionic/react';
import React from 'react';
import Header from '../../components/header';
import LoadingSpinner from '../../components/loadingSpinner';
import TenantPropertiesCommands from './components/commands';
import TenantPropertiesEditPanel from './components/editpanel';
import TenantPropertiesNewPanel from './components/newpanel';
import TenantPropertiesList from './components/tenantpropertieslist';

const TenantProperties = () => {
  return (
    <IonPage>
      <Header title={'Tenant Properties'} showOnLoad={false} headline="" content="" />
      {/* Actions menu */}
      <TenantPropertiesCommands />
      <IonContent>
        <LoadingSpinner />
        {/* List of tenant properties */}
        <TenantPropertiesList />
        {/* Panel to edit tenant property */}
        <TenantPropertiesEditPanel />
        {/* Panel to create new tenant property */}
        <TenantPropertiesNewPanel />
      </IonContent>
    </IonPage>
  );
};

export default TenantProperties;
