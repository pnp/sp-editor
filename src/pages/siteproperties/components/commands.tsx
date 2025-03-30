import { CommandBar, SearchBox, Stack, Label, TagPicker, ITag } from '@fluentui/react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../../store';
import { setSearchString, setSelectedSite } from '../../../store/siteproperties/actions';
import { getAllSiteProperties, getAllSites } from '../chrome/chrome-actions';

const SitePropertiesCommands = () => {
  const { sites, selectedSite } = useSelector((state: IRootState) => state.siteProperties);
  const dispatch = useDispatch();

  return (
    <CommandBar
      styles={{
        root: {
          alignItems: 'center',
        },
      }}
      items={[
        {
          key: 'siteSelector',
          onRender: () => (
            <>
              <Stack horizontal tokens={{ childrenGap: 10 }}>
                <Label>Site: </Label>
                <TagPicker
                  styles={{ root: { width: 300 } }}
                  onChange={(items) => {
                    if (items?.length) {
                      const selectedSite = sites.find((site) => site.key === items[0].key);
                      getAllSiteProperties(dispatch, selectedSite?.key.toString() ?? '');
                      dispatch(setSelectedSite(selectedSite));
                    }
                  }}
                  pickerSuggestionsProps={{
                    suggestionsHeaderText: 'Available sites',
                    noResultsFoundText: 'No sites found',
                  }}
                  itemLimit={1}
                  onResolveSuggestions={function (
                    filter: string,
                    selectedItems?: ITag[] | undefined
                  ): ITag[] | PromiseLike<ITag[]> {
                    return getAllSites(dispatch, filter, selectedSite?.key).then((r) => {
                      return r?.map((s: any) => ({
                        key: s.key,
                        name: s.text,
                      }));
                    });
                  }}
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
      ]}
      overflowButtonProps={{ ariaLabel: 'More commands' }}
      ariaLabel={'Use left and right arrow keys to navigate between commands'}
    />
  );
};

export default SitePropertiesCommands;
