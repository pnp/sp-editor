import { IOverlayProps, Panel, PanelType, PrimaryButton, Stack, TextField, Toggle } from '@fluentui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../../store';
import { setNewPanel } from '../../../store/tenantproperties/actions';
import { ITenantProperty } from '../../../store/tenantproperties/types';
import { addTenantProperty } from '../chrome/chrome-actions';

const TenantPropertiesNewPanel = () => {
  const { newpanel } = useSelector((state: IRootState) => state.tenantProperties);

  const dispatch = useDispatch();

  const [newItem, setNewItem] = useState<ITenantProperty>({
    key: '',
    value: '',
    description: '',
    comment: '',
  });

  const { isDark } = useSelector((state: IRootState) => state.home);
  const panelOverlayProps: IOverlayProps = { isDarkThemed: isDark };

  useEffect(() => {
    setNewItem({
      key: '',
      value: '',
      description: '',
      comment: '',
    });
  }, [newpanel]);

  const _onRenderNewFooterContent = () => {
    return (
      <PrimaryButton
        onClick={() => {
          if (newItem && newItem.key && newItem.key.length > 0) {
            addTenantProperty(dispatch, newItem, false);
          }
        }}
        style={{ marginRight: '8px' }}
        text={'Add'}
        disabled={!(newItem?.value.length && newItem?.key.length && newItem?.value)}
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
      headerText="Add Tenant Property"
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
          onChange={(event, newValue?: string) => {
            setNewItem({ ...newItem, key: newValue || '' });
          }}
          required
        />
        <TextField
          label="Property Value"
          description="The value of the property"
          value={newItem.value}
          multiline
          rows={5}
          autoAdjustHeight={true}
          required
          onChange={(event, newValue?: string) => setNewItem({ ...newItem, value: newValue ? newValue : '' })}
        />
        <TextField
          label="Property Description"
          description="The description of the property"
          value={newItem.description}
          multiline
          rows={5}
          autoAdjustHeight={true}
          onChange={(event, newValue?: string) => setNewItem({ ...newItem, description: newValue ? newValue : '' })}
        />
        <TextField
          label="Property Comment"
          description="The comment of the property"
          value={newItem.comment}
          multiline
          rows={5}
          autoAdjustHeight={true}
          onChange={(event, newValue?: string) => setNewItem({ ...newItem, comment: newValue ? newValue : '' })}
        />
      </Stack>
    </Panel>
  );
};

export default TenantPropertiesNewPanel;
