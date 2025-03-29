import { IOverlayProps, Panel, PanelType, PrimaryButton, Stack, TextField, Toggle } from '@fluentui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../../store';
import { setNewPanel } from '../../../store/siteproperties/actions';
import { ISiteProperty } from '../../../store/siteproperties/types';
import { addSiteProperty } from '../chrome/chrome-actions';

const SitePropertiesNewPanel = () => {
  const { newpanel, selectedSite } = useSelector((state: IRootState) => state.siteProperties);

  const dispatch = useDispatch();

  const [newItem, setNewItem] = useState<ISiteProperty>({
    indexed: false,
    key: '',
    value: '',
    siteId: selectedSite!,
  });

  const { isDark } = useSelector((state: IRootState) => state.home);
  const panelOverlayProps: IOverlayProps = { isDarkThemed: isDark };

  useEffect(() => {
    setNewItem({
      indexed: false,
      key: '',
      value: '',
      siteId: selectedSite!,
    });
  }, [newpanel, selectedSite]);

  const _onRenderNewFooterContent = () => {
    return (
      <PrimaryButton
        onClick={() => {
          if (newItem && newItem.key && newItem.key.length > 0) {
            addSiteProperty(dispatch, newItem, false);
          }
        }}
        style={{ marginRight: '8px' }}
        text={'Add'}
      />
    );
  };

  return (
    <Panel
      isOpen={newpanel}
      type={PanelType.smallFixedFar}
      onDismiss={() => {
        dispatch(setNewPanel(false));
      }}
      isLightDismiss={true}
      isFooterAtBottom={true}
      headerText="Add Site Property"
      closeButtonAriaLabel="Close"
      onRenderFooterContent={_onRenderNewFooterContent}
      overlayProps={panelOverlayProps}
    >
      {/* Panel new form */}
      <Stack>
        <TextField
          label="Property Key"
          description="The key of the property"
          value={newItem.key}
          onChange={(event, newValue?: string) => setNewItem({ ...newItem, key: newValue ? newValue : '' })}
          required
        />
        <TextField
          label="Property Value"
          description="The value of the property"
          value={newItem.value}
          multiline
          rows={5}
          autoAdjustHeight={true}
          onChange={(event, newValue?: string) => setNewItem({ ...newItem, value: newValue ? newValue : '' })}
        />
        <Toggle
          label="Indexed"
          checked={newItem.indexed}
          onText="Yes"
          offText="No"
          onChange={(event, checked?: boolean) => setNewItem({ ...newItem, indexed: checked ? true : false })}
        />
      </Stack>
    </Panel>
  );
};

export default SitePropertiesNewPanel;
