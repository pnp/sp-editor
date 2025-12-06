import { useState, useEffect, useCallback } from 'react'
import {
  Panel,
  PanelType,
  DetailsList,
  DetailsListLayoutMode,
  SelectionMode,
  IColumn,
  MessageBar,
  MessageBarType,
  Spinner,
  SpinnerSize,
  Stack,
  Text,
  Icon,
  IconButton,
  useTheme,
} from '@fluentui/react'
import {
  fetchSiteDesignRuns,
  fetchSiteDesignRunStatus,
  ISiteDesignRun,
  ISiteDesignRunAction,
} from '../chrome/chrome-actions'

interface ISiteDesignRunsPanelProps {
  isOpen: boolean
  onDismiss: () => void
  tabId: number | null
}

const SiteDesignRunsPanel = ({ isOpen, onDismiss, tabId }: ISiteDesignRunsPanelProps) => {
  const theme = useTheme()
  
  const [runs, setRuns] = useState<ISiteDesignRun[]>([])
  const [selectedRun, setSelectedRun] = useState<ISiteDesignRun | null>(null)
  const [runActions, setRunActions] = useState<ISiteDesignRunAction[]>([])
  const [webUrl, setWebUrl] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadRuns = useCallback(async () => {
    if (!tabId) return

    setLoading(true)
    setError(null)
    try {
      const result = await fetchSiteDesignRuns(tabId)
      setRuns(result.runs)
      setWebUrl(result.webUrl)
    } catch (err: any) {
      setError(err.message || 'Failed to load site design runs')
    } finally {
      setLoading(false)
    }
  }, [tabId])

  // Load runs when panel opens
  useEffect(() => {
    if (isOpen && tabId) {
      loadRuns()
    }
  }, [isOpen, tabId, loadRuns])

  // Reset state when panel closes
  useEffect(() => {
    if (!isOpen) {
      setSelectedRun(null)
      setRunActions([])
      setError(null)
    }
  }, [isOpen])

  const loadRunStatus = useCallback(async (run: ISiteDesignRun) => {
    if (!tabId) return

    setLoading(true)
    setError(null)
    setSelectedRun(run)
    try {
      // Use run.ID (the run ID) for GetSiteDesignRunStatus
      const actions = await fetchSiteDesignRunStatus(tabId, run.ID, webUrl)
      setRunActions(actions)
    } catch (err: any) {
      setError(err.message || 'Failed to load run status')
    } finally {
      setLoading(false)
    }
  }, [tabId, webUrl])

  const handleBack = () => {
    setSelectedRun(null)
    setRunActions([])
    setError(null)
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return ''
    try {
      // SharePoint returns Unix timestamp in milliseconds as a string
      const timestamp = parseInt(dateString, 10)
      if (!isNaN(timestamp) && timestamp > 0) {
        const date = new Date(timestamp)
        // Check if date is valid
        if (!isNaN(date.getTime())) {
          return date.toLocaleString()
        }
      }
      // Fallback for ISO date strings or other formats
      const date = new Date(dateString)
      if (!isNaN(date.getTime())) {
        return date.toLocaleString()
      }
      return 'Unknown date'
    } catch {
      return dateString
    }
  }

  const columns: IColumn[] = [
    {
      key: 'title',
      name: 'Site Design',
      fieldName: 'SiteDesignTitle',
      minWidth: 150,
      maxWidth: 250,
      isResizable: true,
    },
    {
      key: 'version',
      name: 'Version',
      fieldName: 'SiteDesignVersion',
      minWidth: 60,
      maxWidth: 80,
    },
    {
      key: 'startTime',
      name: 'Applied On',
      minWidth: 150,
      maxWidth: 200,
      isResizable: true,
      onRender: (item: ISiteDesignRun) => formatDate(item.StartTime),
    },
    {
      key: 'actions',
      name: '',
      minWidth: 40,
      maxWidth: 40,
      onRender: (item: ISiteDesignRun) => (
        <IconButton
          iconProps={{ iconName: 'ChevronRight' }}
          title="View details"
          onClick={(e) => {
            e.stopPropagation()
            loadRunStatus(item)
          }}
        />
      ),
    },
  ]

  const renderRunsList = () => {
    if (loading && runs.length === 0) {
      return (
        <Stack horizontalAlign="center" styles={{ root: { padding: 40 } }}>
          <Spinner size={SpinnerSize.large} label="Loading site design runs..." />
        </Stack>
      )
    }

    if (runs.length === 0) {
      return (
        <div style={{ padding: 20, textAlign: 'center', color: theme.palette.neutralSecondary }}>
          <Icon iconName="History" styles={{ root: { fontSize: 48, marginBottom: 12 } }} />
          <Text block variant="medium">
            No site designs have been applied to this site yet.
          </Text>
        </div>
      )
    }

    return (
      <DetailsList
        items={runs}
        columns={columns}
        layoutMode={DetailsListLayoutMode.justified}
        selectionMode={SelectionMode.none}
        onItemInvoked={loadRunStatus}
      />
    )
  }

  const renderActionDetails = () => {
    if (loading) {
      return (
        <Stack horizontalAlign="center" styles={{ root: { padding: 40 } }}>
          <Spinner size={SpinnerSize.large} label="Loading action details..." />
        </Stack>
      )
    }

    if (runActions.length === 0) {
      return (
        <div style={{ padding: 20, textAlign: 'center', color: theme.palette.neutralSecondary }}>
          <Text>No action details available for this run.</Text>
        </div>
      )
    }

    // Group actions by site script
    const groupedActions: { [key: string]: ISiteDesignRunAction[] } = {}
    runActions.forEach((action) => {
      const scriptTitle = action.SiteScriptTitle || 'Unknown Script'
      if (!groupedActions[scriptTitle]) {
        groupedActions[scriptTitle] = []
      }
      groupedActions[scriptTitle].push(action)
    })

    return (
      <Stack tokens={{ childrenGap: 16 }}>
        {Object.entries(groupedActions).map(([scriptTitle, actions]) => (
          <Stack key={scriptTitle} tokens={{ childrenGap: 8 }}>
            <Text variant="mediumPlus" styles={{ root: { fontWeight: 600 } }}>
              {scriptTitle}
            </Text>
            {actions
              .sort((a, b) => a.ActionIndex - b.ActionIndex)
              .map((action, idx) => {
                const isSuccess = action.OutcomeCode === 0
                const statusColor = isSuccess ? '#107c10' : '#d13438'
                return (
                  <div
                    key={`${action.SiteScriptID}-${idx}`}
                    style={{
                      padding: '8px 12px',
                      marginBottom: 8,
                      backgroundColor: theme.palette.neutralLighter,
                      borderRadius: 4,
                      borderLeft: `3px solid ${statusColor}`,
                    }}
                  >
                    <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 8 }}>
                      <Icon
                        iconName={isSuccess ? 'CheckMark' : 'ErrorBadge'}
                        styles={{ root: { color: statusColor } }}
                      />
                      <Text styles={{ root: { fontWeight: 500 } }}>{action.ActionTitle}</Text>
                    </Stack>
                    {action.OutcomeText && (
                      <Text
                        variant="small"
                        styles={{ root: { marginTop: 4, display: 'block', color: theme.palette.neutralSecondary } }}
                      >
                        {action.OutcomeText}
                      </Text>
                    )}
                  </div>
                )
              })}
          </Stack>
        ))}
      </Stack>
    )
  }

  const panelTitle = selectedRun
    ? `Run Details: ${selectedRun.SiteDesignTitle}`
    : 'Applied Site Designs'

  // Panel styles to respect theme
  const panelStyles = {
    main: { backgroundColor: theme.palette.white },
    content: { backgroundColor: theme.palette.white },
    commands: { backgroundColor: theme.palette.white },
    contentInner: { backgroundColor: theme.palette.white },
  }

  return (
    <Panel
      headerText={panelTitle}
      isOpen={isOpen}
      onDismiss={onDismiss}
      type={PanelType.medium}
      closeButtonAriaLabel="Close"
      isLightDismiss={true}
      styles={panelStyles}
    >
      <Stack tokens={{ childrenGap: 12 }} styles={{ root: { marginTop: 16 } }}>
        {error && (
          <MessageBar
            messageBarType={MessageBarType.error}
            onDismiss={() => setError(null)}
          >
            {error}
          </MessageBar>
        )}

        {selectedRun && (
          <Stack styles={{ root: { marginBottom: 12 } }}>
            <IconButton
              iconProps={{ iconName: 'Back' }}
              title="Back to runs list"
              onClick={handleBack}
              styles={{ root: { alignSelf: 'flex-start' } }}
            />
            <MessageBar messageBarType={MessageBarType.info}>
              Applied: {formatDate(selectedRun.StartTime)} (Version {selectedRun.SiteDesignVersion})
            </MessageBar>
          </Stack>
        )}

        {selectedRun ? renderActionDetails() : renderRunsList()}
      </Stack>
    </Panel>
  )
}

export default SiteDesignRunsPanel
