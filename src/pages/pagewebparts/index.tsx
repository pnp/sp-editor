import { IonContent, IonPage } from '@ionic/react'
import React from 'react'
import Header from '../../components/header'
import LoadingSpinner from '../../components/loadingSpinner'
import PageWebPartsCommands from './components/commands'
import PageLayoutView from './components/layoutview'
import WebPartPropertiesPanel from './components/propertiespanel'

const PageWebParts = () => {
  return (
    <IonPage>
      <Header title={'Page Web Parts'} showOnLoad={false} headline='' content='' />
      <PageWebPartsCommands />
      <IonContent>
        <LoadingSpinner />
        <PageLayoutView />
        <WebPartPropertiesPanel />
      </IonContent>
    </IonPage>
  )
}

export default PageWebParts

