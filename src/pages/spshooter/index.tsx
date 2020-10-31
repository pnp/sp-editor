import { IonContent, IonPage } from '@ionic/react'
import React from 'react'
import Header from '../../components/header'
import SPShootCommands from './components/commands'
import SPShooterResults from './components/spshooterresults'

const SPShooter = () => {

  return (
    <IonPage>
      <Header title={'SP Shooter'} />
      {/* Actions menu
      */}
      <IonContent>
          <SPShootCommands />
          <SPShooterResults />
      </IonContent>
    </IonPage>
  )
}

export default SPShooter
