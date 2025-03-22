import { CommandBar, SearchBox } from '@fluentui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../../store';
import { setConfirmRemoveDialog, setNewPanel, setSearchString } from '../../../store/tenantproperties/actions';

const TenantPropertiesCommands = () => {
  const { selectedItems, tenantproperties } = useSelector((state: IRootState) => state.tenantProperties);
  const dispatch = useDispatch();

  // clear search string when unmounting
  useEffect(() => {
    return () => {
      dispatch(setSearchString(''));
    };
  }, [dispatch]);

  return (
    <>
      <CommandBar
        styles={{
          root: {
            alignItems: 'center',
          },
        }}
        items={[
          {
            key: 'newItem',
            name: 'New',
            cacheKey: 'myCacheKey', // changing this key will invalidate this items cache
            iconProps: {
              iconName: 'Add',
            },
            ariaLabel: 'New',
            onClick: () => {
              dispatch(setNewPanel(true));
            },
          },
          {
            key: 'deleteRow',
            text: 'Remove',
            iconProps: { iconName: 'Delete' },
            disabled: selectedItems.length !== 1,
            onClick: () => {
              dispatch(setConfirmRemoveDialog(false));
            },
          },
          {
            key: 'search',
            onRender: () => (
              <SearchBox
                placeholder="Filter properties"
                iconProps={{ iconName: 'Filter' }}
                styles={{ root: { width: 300 } }}
                disabled={tenantproperties.length === 0}
                onChange={(ev, value) => dispatch(setSearchString(value ? value : ''))}
              />
            ),
          },
        ]}
        overflowButtonProps={{ ariaLabel: 'More commands' }}
        ariaLabel={'Use left and right arrow keys to navigate between commands'}
      />
    </>
  );
};

export default TenantPropertiesCommands;
