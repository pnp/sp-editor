import React, { useState, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  DetailsList,
  DetailsListLayoutMode,
  SelectionMode,
  IColumn,
  Text,
  Panel,
  PanelType,
  Stack,
  Link,
  mergeStyles,
  Icon,
  TooltipHost,
  SearchBox,
  IconButton,
  Dropdown,
  IDropdownOption,
  ScrollablePane,
  Sticky,
  StickyPositionType,
  ConstrainMode,
} from '@fluentui/react';
import { IRootState } from '../../../store';
import { setCrawlLogSelectedEntry } from '../../../store/search/actions';
import { ICrawlEntry, LogLevel } from '../../../store/search/types';

interface CrawlLogResultsProps {
  isDark: boolean;
}

const getLogLevelIcon = (logLevel: LogLevel) => {
  switch (logLevel) {
    case LogLevel.Success:
      return { icon: 'Completed', color: '#107c10' };
    case LogLevel.Warning:
      return { icon: 'Warning', color: '#ffb900' };
    case LogLevel.Error:
      return { icon: 'ErrorBadge', color: '#d13438' };
    default:
      return { icon: 'Info', color: '#0078d4' };
  }
};

const getLogLevelText = (logLevel: LogLevel) => {
  switch (logLevel) {
    case LogLevel.Success:
      return 'Success';
    case LogLevel.Warning:
      return 'Warning';
    case LogLevel.Error:
      return 'Error';
    default:
      return 'Unknown';
  }
};

const logLevelFilterOptions: IDropdownOption[] = [
  { key: 'all', text: 'All Levels' },
  { key: LogLevel.Success, text: 'Success' },
  { key: LogLevel.Warning, text: 'Warning' },
  { key: LogLevel.Error, text: 'Error' },
];

const CrawlLogResults: React.FC<CrawlLogResultsProps> = ({ isDark }) => {
  const dispatch = useDispatch();
  const { crawlLogEntries: entries, crawlLogSelectedEntry: selectedEntry, crawlLogLoading: loading, crawlLogFetchCount: fetchCount } = useSelector((state: IRootState) => state.search);
  const [searchText, setSearchText] = useState('');
  const [filterLogLevel, setFilterLogLevel] = useState<LogLevel | 'all'>('all');
  const [showRawData, setShowRawData] = useState(false);

  // Reset client-side filters when a new fetch is triggered
  useEffect(() => {
    setSearchText('');
    setFilterLogLevel('all');
  }, [fetchCount]);

  const containerClass = mergeStyles({
    padding: '16px',
    height: '100%',
    minHeight: 'calc(100vh - 180px)',
    overflow: 'hidden',
    backgroundColor: isDark ? '#1e1e1e' : '#f5f5f5',
    display: 'flex',
    flexDirection: 'column',
  });

  const panelContainerClass = mergeStyles({
    padding: '16px',
    backgroundColor: isDark ? '#1e1e1e' : '#ffffff',
  });

  const filteredEntries = useMemo(() => {
    let filtered = entries;

    // Client-side log level filter
    if (filterLogLevel !== 'all') {
      filtered = filtered.filter(entry => entry.LogLevel === filterLogLevel);
    }

    // Client-side text search filter
    if (searchText) {
      const lowerSearch = searchText.toLowerCase();
      filtered = filtered.filter(entry => 
        entry.Url.toLowerCase().includes(lowerSearch) ||
        entry.Status.toLowerCase().includes(lowerSearch)
      );
    }

    return filtered;
  }, [entries, searchText, filterLogLevel]);

  const columns: IColumn[] = [
    {
      key: 'logLevel',
      name: '',
      fieldName: 'LogLevel',
      minWidth: 30,
      maxWidth: 30,
      onRender: (item: ICrawlEntry) => {
        const { icon, color } = getLogLevelIcon(item.LogLevel);
        return (
          <TooltipHost content={getLogLevelText(item.LogLevel)}>
            <Icon iconName={icon} styles={{ root: { color, fontSize: 16 } }} />
          </TooltipHost>
        );
      },
    },
    {
      key: 'url',
      name: 'URL',
      fieldName: 'Url',
      minWidth: 300,
      maxWidth: 600,
      isResizable: true,
      onRender: (item: ICrawlEntry) => (
        <TooltipHost content={item.Url}>
          <Link href={item.Url} target="_blank" styles={{ root: { 
            color: isDark ? '#6cb8ff' : '#0078d4',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: 'block',
            maxWidth: 580,
          } }}>
            {item.Url}
          </Link>
        </TooltipHost>
      ),
    },
    {
      key: 'crawlTime',
      name: 'Crawl Time',
      fieldName: 'CrawlTime',
      minWidth: 150,
      maxWidth: 180,
      isResizable: true,
      onRender: (item: ICrawlEntry) => (
        <Text styles={{ root: { color: isDark ? '#ccc' : '#333' } }}>
          {new Date(item.CrawlTime).toLocaleString()}
        </Text>
      ),
    },
    {
      key: 'status',
      name: 'Status',
      fieldName: 'Status',
      minWidth: 150,
      maxWidth: 300,
      isResizable: true,
      onRender: (item: ICrawlEntry) => (
        <TooltipHost content={item.Status || 'Crawled'}>
          <Text styles={{ root: { 
            color: item.Status ? (isDark ? '#ccc' : '#333') : (isDark ? '#888' : '#999'),
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: 'block',
            maxWidth: 280,
            fontStyle: item.Status ? 'normal' : 'italic',
          } }}>
            {item.Status || 'Crawled'}
          </Text>
        </TooltipHost>
      ),
    },
    {
      key: 'errorCode',
      name: 'Error Code',
      fieldName: 'ErrorCode',
      minWidth: 100,
      maxWidth: 120,
      isResizable: true,
      onRender: (item: ICrawlEntry) => {
        const errorCode = item.ErrorCode || 0;
        const hasError = errorCode !== 0;
        return (
          <TooltipHost content={hasError ? `Error code: ${errorCode} (0x${(errorCode >>> 0).toString(16).toUpperCase()})` : 'No error'}>
            <Text styles={{ root: { 
              color: hasError ? '#d13438' : (isDark ? '#ccc' : '#333'),
              fontFamily: 'monospace',
              fontSize: 12,
            } }}>
              {hasError ? `0x${(errorCode >>> 0).toString(16).toUpperCase()}` : '-'}
            </Text>
          </TooltipHost>
        );
      },
    },
    {
      key: 'childrenCount',
      name: 'Children',
      fieldName: 'ChildrenCount',
      minWidth: 70,
      maxWidth: 80,
      onRender: (item: ICrawlEntry) => (
        <Text styles={{ root: { color: isDark ? '#ccc' : '#333' } }}>
          {item.ChildrenCount || 0}
        </Text>
      ),
    },
    {
      key: 'accessData',
      name: 'Type',
      fieldName: 'AccessData',
      minWidth: 60,
      maxWidth: 80,
      onRender: (item: ICrawlEntry) => (
        <Text styles={{ root: { color: isDark ? '#ccc' : '#333' } }}>
          {item.AccessData || '-'}
        </Text>
      ),
    },
    {
      key: 'contentSourceId',
      name: 'Source',
      fieldName: 'ContentSourceId',
      minWidth: 60,
      maxWidth: 70,
      onRender: (item: ICrawlEntry) => (
        <Text styles={{ root: { color: isDark ? '#ccc' : '#333' } }}>
          {item.ContentSourceId}
        </Text>
      ),
    },
  ];

  if (entries.length === 0 && !loading) {
    return (
      <div className={containerClass}>
        <Stack horizontalAlign="center" verticalAlign="center" styles={{ root: { flex: 1, height: '100%' } }}>
          <Icon iconName="Search" styles={{ root: { fontSize: 48, color: isDark ? '#555' : '#ccc', marginBottom: 16 } }} />
          <Text variant="large" styles={{ root: { color: isDark ? '#888' : '#666' } }}>
            No crawl log entries to display
          </Text>
          <Text variant="medium" styles={{ root: { color: isDark ? '#666' : '#888', marginTop: 8 } }}>
            Click "Get Crawl Log" to fetch entries from SharePoint
          </Text>
        </Stack>
      </div>
    );
  }

  return (
    <div className={containerClass}>
      <Stack tokens={{ childrenGap: 8 }} styles={{ root: { flexShrink: 0 } }}>
        <Stack horizontal horizontalAlign="space-between" verticalAlign="center" wrap tokens={{ childrenGap: 8 }}>
          <Text variant="medium" styles={{ root: { color: isDark ? '#ccc' : '#333' } }}>
            {filteredEntries.length} {filteredEntries.length === 1 ? 'entry' : 'entries'} 
            {(searchText || filterLogLevel !== 'all') && ` (filtered from ${entries.length})`}
          </Text>
          <Stack horizontal tokens={{ childrenGap: 12 }} verticalAlign="center">
            <Dropdown
              placeholder="Log Level"
              selectedKey={filterLogLevel}
              options={logLevelFilterOptions}
              onChange={(_, option) => option && setFilterLogLevel(option.key as LogLevel | 'all')}
              styles={{ 
                root: { minWidth: 120 },
                title: { backgroundColor: isDark ? '#333' : undefined },
                dropdown: { backgroundColor: isDark ? '#333' : undefined },
              }}
            />
            <SearchBox
              placeholder="Search URL or status..."
              value={searchText}
              onChange={(_, value) => setSearchText(value || '')}
              styles={{ root: { width: 220 } }}
            />
          </Stack>
        </Stack>
      </Stack>
      
      <div style={{ flex: 1, position: 'relative', marginTop: 8 }}>
        <ScrollablePane>
          <DetailsList
            items={filteredEntries}
            columns={columns}
            layoutMode={DetailsListLayoutMode.justified}
            selectionMode={SelectionMode.none}
            constrainMode={ConstrainMode.unconstrained}
            onItemInvoked={(item: ICrawlEntry) => dispatch(setCrawlLogSelectedEntry(item))}
            onRenderDetailsHeader={(props, defaultRender) => {
              if (!props || !defaultRender) return null;
              return (
                <Sticky stickyPosition={StickyPositionType.Header} isScrollSynced>
                  {defaultRender({
                    ...props,
                    styles: {
                      root: {
                        backgroundColor: isDark ? '#333' : '#f3f2f1',
                      },
                    },
                  })}
                </Sticky>
              );
            }}
            styles={{
              root: {
                backgroundColor: isDark ? '#252526' : '#fff',
              },
              contentWrapper: {
                '& .ms-DetailsRow': {
                  backgroundColor: isDark ? '#252526' : '#fff',
                  '&:hover': {
                    backgroundColor: isDark ? '#3c3c3c' : '#f5f5f5',
                  },
                },
              },
            }}
          />
        </ScrollablePane>
      </div>

      <Panel
        isOpen={!!selectedEntry}
        onDismiss={() => dispatch(setCrawlLogSelectedEntry(null))}
        headerText="Crawl Entry Details"
        type={PanelType.medium}
        isLightDismiss={true}
      >
        {selectedEntry && (
          <div className={panelContainerClass}>
            <Stack tokens={{ childrenGap: 16 }}>
              <Stack tokens={{ childrenGap: 4 }}>
                <Text variant="small" styles={{ root: { color: isDark ? '#888' : '#666', fontWeight: 600 } }}>
                  URL
                </Text>
                <Link href={selectedEntry.Url} target="_blank" styles={{ root: { color: isDark ? '#6cb8ff' : '#0078d4' } }}>
                  {selectedEntry.Url}
                </Link>
              </Stack>

              <Stack tokens={{ childrenGap: 4 }}>
                <Text variant="small" styles={{ root: { color: isDark ? '#888' : '#666', fontWeight: 600 } }}>
                  Log Level
                </Text>
                <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 8 }}>
                  <Icon 
                    iconName={getLogLevelIcon(selectedEntry.LogLevel).icon} 
                    styles={{ root: { color: getLogLevelIcon(selectedEntry.LogLevel).color } }} 
                  />
                  <Text styles={{ root: { color: isDark ? '#ccc' : '#333' } }}>
                    {getLogLevelText(selectedEntry.LogLevel)}
                  </Text>
                </Stack>
              </Stack>

              <Stack tokens={{ childrenGap: 4 }}>
                <Text variant="small" styles={{ root: { color: isDark ? '#888' : '#666', fontWeight: 600 } }}>
                  Crawl Time
                </Text>
                <Text styles={{ root: { color: isDark ? '#ccc' : '#333' } }}>
                  {new Date(selectedEntry.CrawlTime).toLocaleString()}
                </Text>
              </Stack>

              {selectedEntry.ItemTime && (
                <Stack tokens={{ childrenGap: 4 }}>
                  <Text variant="small" styles={{ root: { color: isDark ? '#888' : '#666', fontWeight: 600 } }}>
                    Item Modified Time
                  </Text>
                  <Text styles={{ root: { color: isDark ? '#ccc' : '#333' } }}>
                    {new Date(selectedEntry.ItemTime).toLocaleString()}
                  </Text>
                </Stack>
              )}

              <Stack tokens={{ childrenGap: 4 }}>
                <Text variant="small" styles={{ root: { color: isDark ? '#888' : '#666', fontWeight: 600 } }}>
                  Status
                </Text>
                <Text styles={{ root: { 
                  color: selectedEntry.Status ? (isDark ? '#ccc' : '#333') : (isDark ? '#888' : '#999'),
                  fontStyle: selectedEntry.Status ? 'normal' : 'italic',
                } }}>
                  {selectedEntry.Status || 'Crawled'}
                </Text>
              </Stack>

              <Stack tokens={{ childrenGap: 4 }}>
                <Text variant="small" styles={{ root: { color: isDark ? '#888' : '#666', fontWeight: 600 } }}>
                  Item ID
                </Text>
                <Text styles={{ root: { color: isDark ? '#ccc' : '#333' } }}>
                  {selectedEntry.ItemId}
                </Text>
              </Stack>

              <Stack tokens={{ childrenGap: 4 }}>
                <Text variant="small" styles={{ root: { color: isDark ? '#888' : '#666', fontWeight: 600 } }}>
                  Content Source ID
                </Text>
                <Text styles={{ root: { color: isDark ? '#ccc' : '#333' } }}>
                  {selectedEntry.ContentSourceId}
                </Text>
              </Stack>

              {selectedEntry.ErrorCode !== undefined && selectedEntry.ErrorCode !== 0 && (
                <Stack tokens={{ childrenGap: 4 }}>
                  <Text variant="small" styles={{ root: { color: isDark ? '#888' : '#666', fontWeight: 600 } }}>
                    Error Code
                  </Text>
                  <Text styles={{ root: { color: '#d13438', fontFamily: 'monospace' } }}>
                    {selectedEntry.ErrorCode} (0x{(selectedEntry.ErrorCode >>> 0).toString(16).toUpperCase()})
                  </Text>
                </Stack>
              )}

              {selectedEntry.ChildrenCount !== undefined && selectedEntry.ChildrenCount > 0 && (
                <Stack tokens={{ childrenGap: 4 }}>
                  <Text variant="small" styles={{ root: { color: isDark ? '#888' : '#666', fontWeight: 600 } }}>
                    Children Count
                  </Text>
                  <Text styles={{ root: { color: isDark ? '#ccc' : '#333' } }}>
                    {selectedEntry.ChildrenCount}
                  </Text>
                </Stack>
              )}

              {selectedEntry.AccessData && (
                <Stack tokens={{ childrenGap: 4 }}>
                  <Text variant="small" styles={{ root: { color: isDark ? '#888' : '#666', fontWeight: 600 } }}>
                    Access Type
                  </Text>
                  <Text styles={{ root: { color: isDark ? '#ccc' : '#333' } }}>
                    {selectedEntry.AccessData}
                  </Text>
                </Stack>
              )}

              {selectedEntry.DatabaseName && (
                <Stack tokens={{ childrenGap: 4 }}>
                  <Text variant="small" styles={{ root: { color: isDark ? '#888' : '#666', fontWeight: 600 } }}>
                    Database
                  </Text>
                  <Text styles={{ root: { color: isDark ? '#ccc' : '#333', fontFamily: 'monospace', fontSize: 12 } }}>
                    {selectedEntry.DatabaseName}
                  </Text>
                </Stack>
              )}

              {selectedEntry.SiteId && (
                <Stack tokens={{ childrenGap: 4 }}>
                  <Text variant="small" styles={{ root: { color: isDark ? '#888' : '#666', fontWeight: 600 } }}>
                    Site ID
                  </Text>
                  <Text styles={{ root: { color: isDark ? '#ccc' : '#333', fontFamily: 'monospace', fontSize: 12 } }}>
                    {selectedEntry.SiteId}
                  </Text>
                </Stack>
              )}

              {selectedEntry.WebId && (
                <Stack tokens={{ childrenGap: 4 }}>
                  <Text variant="small" styles={{ root: { color: isDark ? '#888' : '#666', fontWeight: 600 } }}>
                    Web ID
                  </Text>
                  <Text styles={{ root: { color: isDark ? '#ccc' : '#333', fontFamily: 'monospace', fontSize: 12 } }}>
                    {selectedEntry.WebId}
                  </Text>
                </Stack>
              )}

              <Stack horizontal tokens={{ childrenGap: 16 }}>
                {selectedEntry.IsDeleted && (
                  <Stack 
                    horizontal 
                    verticalAlign="center" 
                    tokens={{ childrenGap: 4 }}
                    styles={{ 
                      root: { 
                        backgroundColor: isDark ? '#3d1a1a' : '#fde7e9',
                        padding: '4px 8px',
                        borderRadius: 4,
                      } 
                    }}
                  >
                    <Icon iconName="Delete" styles={{ root: { color: '#d13438', fontSize: 12 } }} />
                    <Text styles={{ root: { color: '#d13438', fontSize: 12 } }}>Deleted</Text>
                  </Stack>
                )}
                {selectedEntry.NoIndex && (
                  <Stack 
                    horizontal 
                    verticalAlign="center" 
                    tokens={{ childrenGap: 4 }}
                    styles={{ 
                      root: { 
                        backgroundColor: isDark ? '#3d3419' : '#fff4ce',
                        padding: '4px 8px',
                        borderRadius: 4,
                      } 
                    }}
                  >
                    <Icon iconName="Hide" styles={{ root: { color: '#ffb900', fontSize: 12 } }} />
                    <Text styles={{ root: { color: '#ffb900', fontSize: 12 } }}>NoIndex</Text>
                  </Stack>
                )}
              </Stack>

              {/* Raw Data Section */}
              <Stack tokens={{ childrenGap: 8 }} styles={{ root: { marginTop: 16, borderTop: `1px solid ${isDark ? '#444' : '#ddd'}`, paddingTop: 16 } }}>
                <Stack 
                  horizontal 
                  verticalAlign="center" 
                  tokens={{ childrenGap: 8 }}
                  styles={{ root: { cursor: 'pointer' } }}
                  onClick={() => setShowRawData(!showRawData)}
                >
                  <IconButton
                    iconProps={{ iconName: showRawData ? 'ChevronDown' : 'ChevronRight' }}
                    styles={{ root: { width: 24, height: 24 }, icon: { fontSize: 12 } }}
                  />
                  <Text variant="medium" styles={{ root: { color: isDark ? '#ccc' : '#333', fontWeight: 600 } }}>
                    Raw Data
                  </Text>
                </Stack>
                
                {showRawData && selectedEntry.RawData && (
                  <pre style={{
                    backgroundColor: isDark ? '#1a1a1a' : '#f5f5f5',
                    border: `1px solid ${isDark ? '#333' : '#ddd'}`,
                    borderRadius: 4,
                    padding: 12,
                    overflow: 'auto',
                    maxHeight: 400,
                    fontSize: 11,
                    fontFamily: 'Consolas, Monaco, monospace',
                    color: isDark ? '#9cdcfe' : '#0066cc',
                    margin: 0,
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                  }}>
                    {JSON.stringify(selectedEntry.RawData, null, 2)}
                  </pre>
                )}
              </Stack>
            </Stack>
          </div>
        )}
      </Panel>
    </div>
  );
};

export default CrawlLogResults;
