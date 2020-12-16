import { IonContent, IonPage } from '@ionic/react'
import React from 'react'

import Header from '../../components/header'
import LoadingSpinner from '../../components/loadingSpinner'
import MGTEditor from './components/mgteditor'

const MGTConsole = () => {
  return (
    <IonPage>
      <Header title={"Microsoft Graph Toolkit Console"} />
      <IonContent>
        <LoadingSpinner />
        <MGTEditor />
      </IonContent>
    </IonPage>
  );
};

export default MGTConsole
