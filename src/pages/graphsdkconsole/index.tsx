import { IonContent, IonPage } from '@ionic/react'
import React from 'react'

import Header from '../../components/header'
import LoadingSpinner from '../../components/loadingSpinner'
import GraphSDKEditor from './components/graphsdkeditor'

const GraphSDKConsole = () => {
  return (
    <IonPage>
      <Header title={'Graph SDK Console'} />
      <IonContent>
        <LoadingSpinner />
        <GraphSDKEditor />
      </IonContent>
    </IonPage>
  )
}

export default GraphSDKConsole
