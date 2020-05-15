import { IonContent, IonPage } from '@ionic/react'
import React from 'react'
import Header from '../../components/header'
import ApiTesterCommands from './components/commands'
import ApiTesterResults from './components/resultsview'

const ApiTester = () => {

  return (
    <IonPage>
      <Header title={'Api tester'} />
      {/* Actions menu */}
      <IonContent>
        <ApiTesterCommands />
        <ApiTesterResults />
      </IonContent>
    </IonPage>
  )
}

export default ApiTester
