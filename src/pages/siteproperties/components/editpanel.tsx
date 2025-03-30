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
} from '@fluentui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../../store';
import { setConfirmEditDialog, setEditPanel, setSelectedItem } from '../../../store/siteproperties/actions';
import { ISiteProperty } from '../../../store/siteproperties/types';
import { addSiteProperty } from '../chrome/chrome-actions';

const SitePropertiesEditPanel = () => {
  const dispatch = useDispatch();
  const { isDark } = useSelector((state: IRootState) => state.home);
  const { editpanel, selectedItem, confirmedit, selectedSite } = useSelector(
    (state: IRootState) => state.siteProperties
  );

  const [editItem, setEditItem] = useState<ISiteProperty>();

  useEffect(() => {
    setEditItem(selectedItem);
  }, [selectedItem]);

  const panelOverlayProps: IOverlayProps = { isDarkThemed: isDark };
  const _onRenderItemFooterContent = () => {
    return (
      <PrimaryButton
        onClick={() => {
          if (editItem) {
            dispatch(setSelectedItem(editItem));
            dispatch(setConfirmEditDialog(false));
          }
        }}
        style={{ marginRight: '8px' }}
        text={'Update'}
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
      headerText="Edit Site Property"
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
              if (editItem) {
                // Update local state only
                setEditItem({ ...editItem, value: newValue ?? '' });
              }
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
          title: 'Edit Site Property',
          closeButtonAriaLabel: 'Cancel',
          subText: `Sure you want to edit the selected site property?`,
        }}
        modalProps={{
          isDarkOverlay: isDark,
        }}
      >
        <DialogFooter>
          <PrimaryButton
            onClick={() => {
              addSiteProperty(dispatch, selectedItem!, selectedSite?.siteId?.toString() ?? '', true);
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

export default SitePropertiesEditPanel;
