import { CommandBar, SearchBox, Stack, TagPicker, ITag } from '@fluentui/react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../../store';
import {
  setSearchString,
  setSelectedSite,
  setAllSiteProperties,
  setShowAllProperties,
} from '../../../store/siteproperties/actions';
import { getAllSiteProperties, getAllSites } from '../chrome/chrome-actions';
import { IonToggle } from '@ionic/react';

const SitePropertiesCommands = () => {
  const { sites, selectedSite, showAllProperties } = useSelector((state: IRootState) => state.siteProperties);
  const dispatch = useDispatch();

  return (
    <CommandBar
      styles={{
        root: {
          alignItems: 'center',
        },
        primarySet: {
          columnGap: '16px',
        },
      }}
      items={[
        {
          key: 'siteSelector',
          onRender: () => (
            <>
              <Stack horizontal tokens={{ childrenGap: 10 }}>
                <TagPicker
                  styles={{ root: { width: 300 } }}
                  inputProps={{ placeholder: 'Select site' }}
                  onChange={(items) => {
                    if (items?.length) {
                      const selectedSite = sites.find((site) => site.key === items[0].key);
                      getAllSiteProperties(dispatch, selectedSite?.key.toString() ?? '');
                      dispatch(setSelectedSite(selectedSite));
                    } else {
                      dispatch(setSelectedSite(undefined));
                      dispatch(setAllSiteProperties([]));
                    }
                  }}
                  pickerSuggestionsProps={{
                    suggestionsHeaderText: 'Available sites',
                    noResultsFoundText: 'No sites found',
                  }}
                  itemLimit={1}
                  onEmptyResolveSuggestions={() =>
                    sites.map((site) => ({
                      key: site.key,
                      name: site.text,
                    }))
                  }
                  onResolveSuggestions={(
                    filter: string,
                    selectedItems?: ITag[] | undefined
                  ): ITag[] | PromiseLike<ITag[]> => {
                    if (!filter) {
                      // Return default suggestions when the input is empty
                      return sites.map((site) => ({
                        key: site.key,
                        name: site.text,
                      }));
                    }
                    // Filter suggestions based on the input
                    return getAllSites(dispatch, filter, selectedSite?.key).then((r) => {
                      return r?.map((s: any) => ({
                        key: s.key,
                        name: s.text,
                      }));
                    });
                  }}
                  pickerCalloutProps={{ doNotLayer: true }}
                />
              </Stack>
            </>
          ),
        },
        {
          key: 'search',
          onRender: () => (
            <SearchBox
              placeholder="Filter properties"
              // onFocus={() => console.log('onFocus called')}
              // onBlur={() => console.log('onBlur called')}
              iconProps={{ iconName: 'Filter' }}
              styles={{ root: { width: 300, paddingLeft: '6px' } }}
              onChange={(ev, value) => dispatch(setSearchString(value ?? ''))}
            />
          ),
        },
        {
          key: 'enableProxy',
          onRenderIcon: () => (
            <IonToggle
              onClick={() => {
                dispatch(setShowAllProperties(!showAllProperties));
              }}
              checked={showAllProperties}
              color="success"
              labelPlacement="end"
            >
              <span
                style={{
                  display: 'inline-block',
                  width: '120px',
                  textAlign: 'left',
                }}
              >
                {showAllProperties ? 'All properties' : 'Editable properties'}
              </span>{' '}
            </IonToggle>
          ),
        },
      ]}
      overflowButtonProps={{ ariaLabel: 'More commands' }}
      ariaLabel={'Use left and right arrow keys to navigate between commands'}
    />
  );
};

export default SitePropertiesCommands;
