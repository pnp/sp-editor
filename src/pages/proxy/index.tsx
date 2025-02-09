import { IonContent, IonPage } from '@ionic/react'
import React from 'react'
import Header from '../../components/header'
import LoadingSpinner from '../../components/loadingSpinner'
import ProxyCommands from './components/commands'
import ProxyEditPanel from './components/editpanel'
import ProxyList from './components/proxylist'

const Proxy = () => {
  return (
    <IonPage>
      <Header title={'Proxy'} showOnLoad={false} headline='' content=''/>
      {/* Actions menu */}
      <ProxyCommands />
      <IonContent>
        <LoadingSpinner />
        {/* List of proxies */}
        <ProxyList />
        {/* Panel to edit proxy */}
        <ProxyEditPanel />
      </IonContent>
    </IonPage>
  )
}

export default Proxy
