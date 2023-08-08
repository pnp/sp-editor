import { IonContent, IonPage } from '@ionic/react'
import React from 'react'
import Header from '../../components/header'
import LoadingSpinner from '../../components/loadingSpinner'
import SearchCommands from './components/commands'
import SearchResults from './components/searchresults'

const Search = () => {
  return (
    <IonPage>
      <Header title={'Search'} />
      <IonContent>
        <LoadingSpinner />
        <SearchCommands />
        <SearchResults />
      </IonContent>
    </IonPage>
  )
}

export default Search
