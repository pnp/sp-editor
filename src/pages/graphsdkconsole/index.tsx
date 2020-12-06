import { IonContent, IonPage } from '@ionic/react'
import React from 'react'

import Header from '../../components/header'
import GraphSDKEditor from './components/graphsdkeditor'

const GraphSDKConsole = () => {

  return (
      <IonPage>
        <Header title={'Graph SDK Console'} />
        <IonContent>
          <GraphSDKEditor />
        </IonContent>
      </IonPage>
  )
}

export default GraphSDKConsole
