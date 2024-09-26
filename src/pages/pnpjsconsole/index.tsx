import { IonContent, IonPage } from '@ionic/react'
import React from 'react'

import Header from '../../components/header'
import LoadingSpinner from '../../components/loadingSpinner'
import PnPjsEditor from './components/pnpjseditor'

const PnPjsConsole = () => {
  return (
    <IonPage>
      <Header title={'PnPjs Console'} showOnLoad={false} headline='' content=''/>
      <IonContent>
        <LoadingSpinner />
        <PnPjsEditor />
      </IonContent>
    </IonPage>
  )
}

export default PnPjsConsole
