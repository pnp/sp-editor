import { IonContent, IonPage } from '@ionic/react'
import { useState, useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { Dialog, DialogType, DialogFooter, PrimaryButton, DefaultButton } from '@fluentui/react'
import { setLoading } from '../../../store/home/actions'
import LoadingSpinner from '../../../components/loadingSpinner'
import FieldCustomizersCommandBar from './components/FieldCustomizersCommandBar'
import FieldCustomizers, { IFieldInfoWithList } from './components/FieldCustomizers'
import { loadAllFieldCustomizers, deleteFieldCustomizer } from './chrome/chrome-actions'
import Header from '../../../components/header'

const FieldCustomizersPage = () => {
  const dispatch = useDispatch()
  const [addPanelOpen, setAddPanelOpen] = useState(false)
  const [tabId, setTabId] = useState<number | null>(null)
  const [selectedField, setSelectedField] = useState<IFieldInfoWithList | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  // Get current tab
  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) {
        setTabId(tabs[0].id)
      }
    })
  }, [])

  const handleRefresh = () => {
    if (!tabId) return
    dispatch(setLoading(true))
    loadAllFieldCustomizers(dispatch, tabId)
  }

  const handleSelectionChanged = useCallback((item: IFieldInfoWithList | null) => {
    setSelectedField(item)
  }, [])

  const handleRemoveClick = () => {
    if (selectedField) {
      setDeleteDialogOpen(true)
    }
  }

  const handleConfirmDelete = () => {
    if (!tabId || !selectedField) return

    dispatch(setLoading(true))
    deleteFieldCustomizer(tabId, selectedField.listId, selectedField.Id)
      .then(() => {
        setDeleteDialogOpen(false)
        setSelectedField(null)
        handleRefresh()
      })
      .catch((err) => {
        console.error('Failed to remove customizer:', err)
        dispatch(setLoading(false))
      })
  }

  return (
    <IonPage>
      <IonContent>
        <LoadingSpinner />
        <Header title={'Field Customizers'} showOnLoad={false} headline="" content="" />
        <FieldCustomizersCommandBar
          onAdd={() => setAddPanelOpen(true)}
          onRefresh={handleRefresh}
          onRemove={handleRemoveClick}
          hasSelection={!!selectedField}
        />
        <FieldCustomizers
          addPanelOpen={addPanelOpen}
          onAddPanelDismiss={() => setAddPanelOpen(false)}
          onSelectionChanged={handleSelectionChanged}
        />

        {/* Delete Confirmation Dialog */}
        <Dialog
          hidden={!deleteDialogOpen}
          onDismiss={() => setDeleteDialogOpen(false)}
          dialogContentProps={{
            type: DialogType.normal,
            title: 'Remove Field Customizer',
            subText: `Are you sure you want to remove the customizer from "${selectedField?.Title}"? This will reset the field to its default rendering.`,
          }}
          modalProps={{
            isBlocking: false,
          }}
        >
          <DialogFooter>
            <PrimaryButton onClick={handleConfirmDelete} text="Remove" />
            <DefaultButton onClick={() => setDeleteDialogOpen(false)} text="Cancel" />
          </DialogFooter>
        </Dialog>
      </IonContent>
    </IonPage>
  )
}

export default FieldCustomizersPage