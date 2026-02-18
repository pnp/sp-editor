import { IonContent, IonPage } from '@ionic/react'
import { Pivot, PivotItem } from '@fluentui/react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../../components/header'
import LoadingSpinner from '../../components/loadingSpinner'
import PageWebPartsCommands from './components/commands'
import PageWebPartsList from './components/webpartslist'
import PageLayoutView from './components/layoutview'
import WebPartPropertiesPanel from './components/propertiespanel'
import { IRootState } from '../../store'
import { setViewMode } from '../../store/pagewebparts/actions'

const PageWebParts = () => {
  const { viewMode } = useSelector((state: IRootState) => state.pageWebParts)
  const dispatch = useDispatch()

  return (
    <IonPage>
      <Header title={'Page Web Parts'} showOnLoad={false} headline='' content='' />
      <PageWebPartsCommands />
      <Pivot
        selectedKey={viewMode}
        onLinkClick={(item) => {
          if (item && item.props.itemKey) {
            dispatch(setViewMode(item.props.itemKey as 'list' | 'layout'))
          }
        }}
        styles={{ root: { paddingLeft: 8 } }}
      >
        <PivotItem headerText='List' itemKey='list' />
        <PivotItem headerText='Layout' itemKey='layout' />
      </Pivot>
      <IonContent>
        <LoadingSpinner />
        {viewMode === 'list' ? <PageWebPartsList /> : <PageLayoutView />}
        <WebPartPropertiesPanel />
      </IonContent>
    </IonPage>
  )
}

export default PageWebParts

