import { IonContent, IonPage } from '@ionic/react'
import { useState, useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { Dialog, DialogType, DialogFooter, PrimaryButton, DefaultButton } from '@fluentui/react'
import { setLoading } from '../../../store/home/actions'
import LoadingSpinner from '../../../components/loadingSpinner'
import FormCustomizersCommandBar from './components/FormCustomizersCommandBar'
import FormCustomizers from './components/FormCustomizers'
import { loadAllFormCustomizers, saveFormCustomizer } from './chrome/chrome-actions'
import Header from '../../../components/header'

interface ISelectedForm {
  listId: string
  listTitle: string
  contentTypeId: string
  contentTypeName: string
  formType: 'New' | 'Edit' | 'Display'
}

const FormCustomizersPage = () => {
  const dispatch = useDispatch()
  const [addPanelOpen, setAddPanelOpen] = useState(false)
  const [tabId, setTabId] = useState<number | null>(null)
  const [selectedForm, setSelectedForm] = useState<ISelectedForm | null>(null)
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
    loadAllFormCustomizers(dispatch, tabId).finally(() => dispatch(setLoading(false)))
  }

  const handleSelectionChanged = useCallback((item: ISelectedForm | null) => {
    setSelectedForm(item)
  }, [])

  const handleRemoveClick = () => {
    if (selectedForm) {
      setDeleteDialogOpen(true)
    }
  }

  const handleConfirmDelete = async () => {
    if (!tabId || !selectedForm) return

    try {
      dispatch(setLoading(true))
      await saveFormCustomizer(
        tabId,
        selectedForm.listId,
        selectedForm.contentTypeId,
        selectedForm.formType,
        null,
        null
      )
      setDeleteDialogOpen(false)
      setSelectedForm(null)
      handleRefresh()
    } catch (err) {
      console.error('Failed to remove customizer:', err)
      dispatch(setLoading(false))
    }
  }

  return (
    <IonPage>
      <IonContent>
        <LoadingSpinner />
        <Header title={'Form Customizers'} showOnLoad={false} headline="" content="" />
        <FormCustomizersCommandBar
          onAdd={() => setAddPanelOpen(true)}
          onRefresh={handleRefresh}
          onRemove={handleRemoveClick}
          hasSelection={!!selectedForm}
        />
        <FormCustomizers
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
            title: 'Remove Form Customizer',
            subText: `Are you sure you want to remove the ${selectedForm?.formType} form customizer from "${selectedForm?.contentTypeName}" in "${selectedForm?.listTitle}"? This will reset the form to its default rendering.`,
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

export default FormCustomizersPage
