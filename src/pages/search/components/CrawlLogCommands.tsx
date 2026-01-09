import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CommandBar,
  PrimaryButton,
  TextField,
  Dropdown,
  IDropdownOption,
  Stack,
  DatePicker,
  Panel,
  PanelType,
  DefaultButton,
  Text,
  mergeStyles,
  Label,
} from '@fluentui/react';
import { IRootState } from '../../../store';
import { setCrawlLogFilter, setCrawlLogPanelOpen } from '../../../store/search/actions';
import { LogLevel, ContentSource, ICrawlLogFilter } from '../../../store/search/types';
import { fetchCrawlLog } from '../chrome/crawllog-chrome-actions';

interface CrawlLogCommandsProps {
  isDark: boolean;
}

const logLevelOptions: IDropdownOption[] = [
  { key: LogLevel.All, text: 'All' },
  { key: LogLevel.Success, text: 'Success' },
  { key: LogLevel.Warning, text: 'Warning' },
  { key: LogLevel.Error, text: 'Error' },
];

const contentSourceOptions: IDropdownOption[] = [
  { key: ContentSource.Sites, text: 'Sites' },
  { key: ContentSource.UserProfiles, text: 'User Profiles' },
];

const rowLimitOptions: IDropdownOption[] = [
  { key: 50, text: '50' },
  { key: 100, text: '100' },
  { key: 250, text: '250' },
  { key: 500, text: '500' },
  { key: 1000, text: '1,000' },
  { key: 2500, text: '2,500' },
  { key: 5000, text: '5,000' },
  { key: 10000, text: '10,000' },
  { key: 25000, text: '25,000' },
  { key: 50000, text: '50,000' },
  { key: 100000, text: '100,000' },
];

const CrawlLogCommands: React.FC<CrawlLogCommandsProps> = ({ isDark }) => {
  const dispatch = useDispatch();
  const { crawlLogFilter: filter, crawlLogPanelOpen: panelOpen, crawlLogLoading: loading } = useSelector((state: IRootState) => state.search);
  
  const [localFilter, setLocalFilter] = useState<ICrawlLogFilter>({ ...filter });

  const handleSearch = () => {
    dispatch(setCrawlLogFilter(localFilter));
    fetchCrawlLog(dispatch, localFilter);
  };

  const handleFilterChange = (updates: Partial<ICrawlLogFilter>) => {
    const newFilter = { ...localFilter, ...updates };
    setLocalFilter(newFilter);
  };

  const panelContainerClass = mergeStyles({
    padding: '16px',
    backgroundColor: isDark ? '#1e1e1e' : '#ffffff',
  });

  return (
    <>
      <CommandBar
        items={[
          {
            key: 'Search',
            onRender: () => (
              <PrimaryButton
                text="Get Crawl Log"
                allowDisabledFocus
                disabled={loading}
                styles={{ root: { marginTop: 6, marginRight: 6 } }}
                onClick={handleSearch}
              />
            ),
          },
          {
            key: 'Filter',
            text: 'Query Options',
            iconProps: { iconName: 'Settings' },
            onClick: () => { dispatch(setCrawlLogPanelOpen(true)); },
          },
        ]}
      />

      <Panel
        isOpen={panelOpen}
        onDismiss={() => dispatch(setCrawlLogPanelOpen(false))}
        headerText="Crawl Log Filter Options"
        type={PanelType.medium}
        isLightDismiss={true}
        onRenderFooterContent={() => (
          <Stack horizontal tokens={{ childrenGap: 8 }} styles={{ root: { padding: '16px' } }}>
            <PrimaryButton text="Apply & Search" onClick={() => {
              dispatch(setCrawlLogFilter(localFilter));
              dispatch(setCrawlLogPanelOpen(false));
              fetchCrawlLog(dispatch, localFilter);
            }} />
            <DefaultButton text="Cancel" onClick={() => dispatch(setCrawlLogPanelOpen(false))} />
          </Stack>
        )}
        isFooterAtBottom={true}
      >
        <div className={panelContainerClass}>
          <Stack tokens={{ childrenGap: 16 }}>
            <Text variant="medium" styles={{ root: { color: isDark ? '#ccc' : '#333' } }}>
              Configure the crawl log query parameters below. Note: You need crawl log read permissions 
              granted via the SharePoint search admin center.
            </Text>

            <TextField
              label="URL Filter"
              placeholder="Leave empty to use default tenant URL"
              value={localFilter.filter}
              onChange={(_, value) => handleFilterChange({ filter: value || '' })}
              description="Filter URLs containing this text. Leave empty to search the entire tenant."
            />

            <Dropdown
              label="Log Level"
              selectedKey={localFilter.logLevel}
              options={logLevelOptions}
              onChange={(_, option) => option && handleFilterChange({ logLevel: option.key as LogLevel })}
            />

            <Dropdown
              label="Content Source"
              selectedKey={localFilter.contentSource}
              options={contentSourceOptions}
              onChange={(_, option) => option && handleFilterChange({ contentSource: option.key as ContentSource })}
            />

            <Dropdown
              label="Row Limit"
              selectedKey={localFilter.rowLimit}
              options={rowLimitOptions}
              onChange={(_, option) => option && handleFilterChange({ rowLimit: option.key as number })}
            />

            <DatePicker
              label="Start Date"
              value={new Date(localFilter.startDate)}
              onSelectDate={(date) => date && handleFilterChange({ startDate: date })}
            />

            <DatePicker
              label="End Date"
              value={new Date(localFilter.endDate)}
              onSelectDate={(date) => date && handleFilterChange({ endDate: date })}
            />
          </Stack>
        </div>
      </Panel>
    </>
  );
};

export default CrawlLogCommands;
