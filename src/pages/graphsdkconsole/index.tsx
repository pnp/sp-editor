import { IonContent, IonPage } from '@ionic/react'
import React from 'react'
import Header from '../../components/header'
import GraphSDKCommands from './components/commands'
import LoadingSpinner from '../../components/loadingSpinner'
import GraphSDKEditor from './components/graphsdkeditor'
import GraphMSALPanel from './components/graphmsalpanel'

const GraphSDKConsole = () => {
  return (
    <IonPage>
      <Header title={'Graph SDK Console'} showOnLoad={false} headline='Header here' content='instructions here'/>
      <GraphSDKCommands />
      <IonContent>
        <LoadingSpinner />
        <GraphSDKEditor />
        <GraphMSALPanel />
      </IonContent>
    </IonPage>
  )
}

export default GraphSDKConsole
