import {
  DefaultButton,
  Dialog,
  DialogFooter,
  DialogType,
  IOverlayProps,
  Panel,
  PanelType,
  PrimaryButton,
  Stack,
  TextField,
  Toggle,
} from '@fluentui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../../store';
// mport { updateScriptLink } from '../../../store/scriptlinks/async-actions'
import { setConfirmEditDialog, setEditPanel, setSelectedItem } from '../../../store/tenantproperties/actions';
import { ITenantProperty } from '../../../store/tenantproperties/types';
import { addTenantProperty } from '../chrome/chrome-actions';

const TenantPropertiesEditPanel = () => {
  const dispatch = useDispatch();
  const { isDark } = useSelector((state: IRootState) => state.home);
  const { editpanel, selectedItem, confirmedit } = useSelector((state: IRootState) => state.tenantProperties);

  const [editItem, setEditItem] = useState<ITenantProperty>();

  useEffect(() => {
    setEditItem(selectedItem);
  }, [selectedItem]);

  const panelOverlayProps: IOverlayProps = { isDarkThemed: isDark };
  const _onRenderItemFooterContent = () => {
    return (
      <PrimaryButton
        onClick={() => dispatch(setConfirmEditDialog(false))}
        style={{ marginRight: '8px' }}
        text={'Update'}
        disabled={!editItem?.value.length}
      />
    );
  };

  return (
    <Panel
      isOpen={editpanel}
      type={PanelType.smallFixedFar}
      onDismiss={() => {
        dispatch(setSelectedItem(undefined));
        dispatch(setEditPanel(false));
      }}
      isLightDismiss={true}
      isFooterAtBottom={true}
      headerText="Edit Tenant Property"
      closeButtonAriaLabel="Close"
      onRenderFooterContent={_onRenderItemFooterContent}
      overlayProps={panelOverlayProps}
    >
      {selectedItem && (
        <Stack>
          <TextField
            label="Property Key"
            description="The key of the property"
            value={editItem ? editItem.key : ''}
            readOnly
            disabled
            required
          />
          <TextField
            label="Property Value"
            description="The value of the property"
            value={editItem ? editItem.value : ''}
            multiline
            rows={5}
            autoAdjustHeight
            onChange={(event, newValue?: string) => {
              dispatch(setSelectedItem({ ...selectedItem, value: newValue ? newValue : '' }));
            }}
          />
          <TextField
            label="Property Description"
            description="The description of the property"
            value={editItem ? editItem.description : ''}
            multiline
            rows={5}
            autoAdjustHeight
            onChange={(event, newValue?: string) => {
              dispatch(setSelectedItem({ ...selectedItem, description: newValue ? newValue : '' }));
            }}
          />
          <TextField
            label="Property Comment"
            description="The comment of the property"
            value={editItem ? editItem.comment : ''}
            multiline
            rows={5}
            autoAdjustHeight
            onChange={(event, newValue?: string) => {
              dispatch(setSelectedItem({ ...selectedItem, comment: newValue ? newValue : '' }));
            }}
          />
        </Stack>
      )}
      <Dialog
        hidden={confirmedit}
        onDismiss={() => dispatch(setConfirmEditDialog(true))}
        dialogContentProps={{
          showCloseButton: true,
          type: DialogType.normal,
          title: 'Edit Tenant Property',
          closeButtonAriaLabel: 'Cancel',
          subText: `Sure you want to edit the selected tenant property?`,
        }}
        modalProps={{
          isDarkOverlay: isDark,
        }}
      >
        <DialogFooter>
          <PrimaryButton
            onClick={() => {
              addTenantProperty(dispatch, selectedItem!, true);
            }}
            text="Update"
          />
          <DefaultButton
            onClick={() => {
              dispatch(setConfirmEditDialog(true));
            }}
            text="Cancel"
          />
        </DialogFooter>
      </Dialog>
    </Panel>
  );
};

export default TenantPropertiesEditPanel;
