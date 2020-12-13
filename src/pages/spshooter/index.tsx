import { IonContent, IonPage } from '@ionic/react'
import React from 'react'
import Header from '../../components/header'
import LoadingSpinner from '../../components/loadingSpinner'
import SPShootCommands from './components/commands'
import SPShooterResults from './components/spshooterresults'

const SPShooter = () => {
  return (
    <IonPage>
      <Header title={"SP Shooter"} />
      <IonContent>
        <LoadingSpinner />
        <SPShootCommands />
        <SPShooterResults />
      </IonContent>
    </IonPage>
  );
};

export default SPShooter
