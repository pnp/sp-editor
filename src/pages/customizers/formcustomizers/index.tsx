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
import { IFormCustomizerInfo } from '../../../store/formcustomizers/types'

const FormCustomizersPage = () => {
  const dispatch = useDispatch()
  const [addPanelOpen, setAddPanelOpen] = useState(false)
  const [tabId, setTabId] = useState<number | null>(null)
  const [selectedForm, setSelectedForm] = useState<IFormCustomizerInfo | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  // Get current tab - use devtools inspectedWindow for DevTools panel context
  useEffect(() => {
    // In DevTools panel, use chrome.devtools.inspectedWindow.tabId
    if (chrome.devtools?.inspectedWindow?.tabId) {
      setTabId(chrome.devtools.inspectedWindow.tabId)
    } else {
      // Fallback for popup or other contexts
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]?.id) {
          setTabId(tabs[0].id)
        }
      })
    }
  }, [])

  const handleSelectionChanged = useCallback((item: IFormCustomizerInfo | null) => {
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
      // Remove form customizer by setting component ID to null
      // Use the new signature with formTypes object
      await saveFormCustomizer(
        tabId,
        selectedForm.listId,
        selectedForm.contentTypeId,
        { [selectedForm.formType]: true } as { New?: boolean; Edit?: boolean; Display?: boolean },
        null,
        null
      )
      setDeleteDialogOpen(false)
      setSelectedForm(null)
      // Reload the data
      dispatch(setLoading(true))
      loadAllFormCustomizers(dispatch, tabId).finally(() => dispatch(setLoading(false)))
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
          onRemove={handleRemoveClick}
          hasSelection={!!selectedForm}
        />
        <div style={{ height: 'calc(100vh - 88px)', position: 'relative' }}>
          <FormCustomizers
            addPanelOpen={addPanelOpen}
            onAddPanelDismiss={() => setAddPanelOpen(false)}
            onSelectionChanged={handleSelectionChanged}
          />
        </div>

        {/* Delete Confirmation Dialog */}
        <Dialog
          hidden={!deleteDialogOpen}
          onDismiss={() => setDeleteDialogOpen(false)}
          dialogContentProps={{
            type: DialogType.normal,
            title: 'Remove Form Customizer',
            subText: `Are you sure you want to remove the ${selectedForm?.formType} form customizer from "${selectedForm?.contentTypeName}" in "${selectedForm?.listTitle}"?`,
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
