import { IonContent, IonPage } from '@ionic/react'
import { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Pivot,
  PivotItem,
  Dialog,
  DialogType,
  DialogFooter,
  PrimaryButton,
  DefaultButton,
} from '@fluentui/react'
import { IRootState } from '../../store'
import { setActiveTab, setSelectedScript, setSelectedDesign } from '../../store/siteprovisioning/actions'
import { setLoading } from '../../store/home/actions'
import { ISiteScript, ISiteDesign, ActiveTab } from '../../store/siteprovisioning/types'
import LoadingSpinner from '../../components/loadingSpinner'
import Header from '../../components/header'
import SiteProvisioningCommandBar from './components/SiteProvisioningCommandBar'
import SiteScripts from './components/SiteScripts'
import SiteDesigns from './components/SiteDesigns'
import {
  loadAll,
  deleteExistingSiteScript,
  deleteExistingSiteDesign,
  loadAllSiteScripts,
  loadAllSiteDesigns,
} from './chrome/chrome-actions'

const SiteProvisioningPage = () => {
  const dispatch = useDispatch()
  const { activeTab, selectedScriptId, selectedDesignId, siteScripts, siteDesigns } = useSelector(
    (state: IRootState) => state.siteProvisioning
  )

  const [tabId, setTabId] = useState<number | null>(null)

  // Panel states
  const [addScriptPanelOpen, setAddScriptPanelOpen] = useState(false)
  const [editScriptPanelOpen, setEditScriptPanelOpen] = useState(false)
  const [addDesignPanelOpen, setAddDesignPanelOpen] = useState(false)
  const [editDesignPanelOpen, setEditDesignPanelOpen] = useState(false)

  // Delete dialog states
  const [deleteScriptDialogOpen, setDeleteScriptDialogOpen] = useState(false)
  const [deleteDesignDialogOpen, setDeleteDesignDialogOpen] = useState(false)

  // Show OOTB (Microsoft) scripts/designs toggle
  const [showOOTB, setShowOOTB] = useState(false)

  // Selected items for tracking
  const [selectedScript, setSelectedScriptState] = useState<ISiteScript | null>(null)
  const [selectedDesign, setSelectedDesignState] = useState<ISiteDesign | null>(null)

  // Get current tab
  useEffect(() => {
    if (chrome.devtools?.inspectedWindow?.tabId) {
      setTabId(chrome.devtools.inspectedWindow.tabId)
    } else {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]?.id) {
          setTabId(tabs[0].id)
        }
      })
    }
  }, [])

  // Load data when tab is available or showOOTB changes
  useEffect(() => {
    if (tabId) {
      loadAll(dispatch, tabId, showOOTB)
    }
  }, [tabId, dispatch, showOOTB])

  // Update selected script state
  useEffect(() => {
    const script = siteScripts.find((s) => s.Id === selectedScriptId) || null
    setSelectedScriptState(script)
  }, [selectedScriptId, siteScripts])

  // Update selected design state
  useEffect(() => {
    const design = siteDesigns.find((d) => d.Id === selectedDesignId) || null
    setSelectedDesignState(design)
  }, [selectedDesignId, siteDesigns])

  const handleTabChange = (item?: PivotItem) => {
    if (item) {
      const key = item.props.itemKey as ActiveTab
      dispatch(setActiveTab(key))
      // Clear selections when switching tabs
      dispatch(setSelectedScript(null))
      dispatch(setSelectedDesign(null))
    }
  }

  const handleScriptSelectionChanged = useCallback((item: ISiteScript | null) => {
    setSelectedScriptState(item)
  }, [])

  const handleDesignSelectionChanged = useCallback((item: ISiteDesign | null) => {
    setSelectedDesignState(item)
  }, [])

  // Command bar handlers
  const handleNew = () => {
    if (activeTab === 'scripts') {
      setAddScriptPanelOpen(true)
    } else {
      setAddDesignPanelOpen(true)
    }
  }

  const handleToggleOOTB = () => {
    // Clear selections when toggling
    dispatch(setSelectedScript(null))
    dispatch(setSelectedDesign(null))
    setShowOOTB(!showOOTB)
  }

  const handleDelete = () => {
    if (activeTab === 'scripts' && selectedScript) {
      setDeleteScriptDialogOpen(true)
    } else if (activeTab === 'designs' && selectedDesign) {
      setDeleteDesignDialogOpen(true)
    }
  }

  const handleExportScript = () => {
    if (selectedScript) {
      const content = {
        Title: selectedScript.Title,
        Description: selectedScript.Description,
        Content: JSON.parse(selectedScript.Content),
        Version: selectedScript.Version,
      }
      const blob = new Blob([JSON.stringify(content, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${selectedScript.Title.replace(/[^a-z0-9]/gi, '_')}.json`
      a.click()
      URL.revokeObjectURL(url)
    }
  }

  const handleConfirmDeleteScript = async () => {
    if (!tabId || !selectedScript) return

    dispatch(setLoading(true))
    try {
      await deleteExistingSiteScript(tabId, selectedScript.Id)
      setDeleteScriptDialogOpen(false)
      dispatch(setSelectedScript(null))
      loadAllSiteScripts(dispatch, tabId, showOOTB)
    } catch (err) {
      console.error('Failed to delete site script:', err)
      dispatch(setLoading(false))
    }
  }

  const handleConfirmDeleteDesign = async () => {
    if (!tabId || !selectedDesign) return

    dispatch(setLoading(true))
    try {
      await deleteExistingSiteDesign(tabId, selectedDesign.Id)
      setDeleteDesignDialogOpen(false)
      dispatch(setSelectedDesign(null))
      loadAllSiteDesigns(dispatch, tabId, showOOTB)
    } catch (err) {
      console.error('Failed to delete site design:', err)
      dispatch(setLoading(false))
    }
  }

  const hasSelection = activeTab === 'scripts' ? !!selectedScript : !!selectedDesign

  return (
    <IonPage>
      <IonContent>
        <LoadingSpinner />
        <Header title="Site Templates" showOnLoad={false} headline="" content="" />
        <Pivot
          selectedKey={activeTab}
          onLinkClick={handleTabChange}
          styles={{ root: { marginLeft: 10 } }}
        >
          <PivotItem headerText="Site Scripts" itemKey="scripts">
            <SiteProvisioningCommandBar
              activeTab={activeTab}
              hasSelection={hasSelection}
              showOOTB={showOOTB}
              selectedIsOOTB={selectedScript?.IsOOTB || false}
              onNew={handleNew}
              onDelete={handleDelete}
              onExport={handleExportScript}
              onToggleOOTB={handleToggleOOTB}
            />
            <SiteScripts
              tabId={tabId}
              addPanelOpen={addScriptPanelOpen}
              editPanelOpen={editScriptPanelOpen}
              onAddPanelDismiss={() => setAddScriptPanelOpen(false)}
              onEditPanelDismiss={() => setEditScriptPanelOpen(false)}
              onEditPanelOpen={() => setEditScriptPanelOpen(true)}
              onSelectionChanged={handleScriptSelectionChanged}
            />
          </PivotItem>
          <PivotItem headerText="Site Designs" itemKey="designs">
            <SiteProvisioningCommandBar
              activeTab={activeTab}
              hasSelection={hasSelection}
              showOOTB={showOOTB}
              selectedIsOOTB={selectedDesign?.IsOOTB || false}
              onNew={handleNew}
              onDelete={handleDelete}
              onToggleOOTB={handleToggleOOTB}
            />
            <SiteDesigns
              tabId={tabId}
              addPanelOpen={addDesignPanelOpen}
              editPanelOpen={editDesignPanelOpen}
              onAddPanelDismiss={() => setAddDesignPanelOpen(false)}
              onEditPanelDismiss={() => setEditDesignPanelOpen(false)}
              onEditPanelOpen={() => setEditDesignPanelOpen(true)}
              onSelectionChanged={handleDesignSelectionChanged}
            />
          </PivotItem>
        </Pivot>

        {/* Delete Script Dialog */}
        <Dialog
          hidden={!deleteScriptDialogOpen}
          onDismiss={() => setDeleteScriptDialogOpen(false)}
          dialogContentProps={{
            type: DialogType.normal,
            title: 'Delete Site Script',
            subText: `Are you sure you want to delete "${selectedScript?.Title}"? This action cannot be undone. Any site designs using this script will be affected.`,
          }}
          modalProps={{ isBlocking: false }}
        >
          <DialogFooter>
            <PrimaryButton onClick={handleConfirmDeleteScript} text="Delete" />
            <DefaultButton onClick={() => setDeleteScriptDialogOpen(false)} text="Cancel" />
          </DialogFooter>
        </Dialog>

        {/* Delete Design Dialog */}
        <Dialog
          hidden={!deleteDesignDialogOpen}
          onDismiss={() => setDeleteDesignDialogOpen(false)}
          dialogContentProps={{
            type: DialogType.normal,
            title: 'Delete Site Design',
            subText: `Are you sure you want to delete "${selectedDesign?.Title}"? This action cannot be undone.`,
          }}
          modalProps={{ isBlocking: false }}
        >
          <DialogFooter>
            <PrimaryButton onClick={handleConfirmDeleteDesign} text="Delete" />
            <DefaultButton onClick={() => setDeleteDesignDialogOpen(false)} text="Cancel" />
          </DialogFooter>
        </Dialog>
      </IonContent>
    </IonPage>
  )
}

export default SiteProvisioningPage
