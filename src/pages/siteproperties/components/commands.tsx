import { CommandBar, SearchBox, ComboBox, IComboBoxOption, IComboBox } from '@fluentui/react';
import React, { FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../../store';
import { setSearchString, setSelectedSite } from '../../../store/siteproperties/actions';
import { getAllSiteProperties } from '../chrome/chrome-actions';

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
            <ComboBox
              placeholder="Select site"
              selectedKey={selectedSite?.key}
              options={sites?.map((site) => ({
                key: site.key,
                text: site.text,
              }))}
              autoComplete="on"
              allowFreeform={false}
              onChange={(
                event: FormEvent<IComboBox>,
                option?: IComboBoxOption | undefined,
                index?: number | undefined
              ): void => {
                if (option) {
                  const selectedSite = sites.find((site) => site.key === option.key);
                  getAllSiteProperties(dispatch, option.key.toString());
                  dispatch(setSelectedSite(selectedSite));
                }
              }}
              styles={{ root: { width: 300 } }}
            />
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
