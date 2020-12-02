import {
  DefaultButton,
  DetailsList,
  Dialog,
  DialogFooter,
  DialogType,
  IColumn,
  PrimaryButton,
  ScrollablePane,
  Selection,
  SelectionMode,
  Sticky,
  StickyPositionType,
} from '@fluentui/react'

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IRootState } from '../../../store'
import { setConfirmRemoveDialog, setEditPanel, setSelectedItem } from '../../../store/webhooks/actions'
import { IWebHook } from '../../../store/webhooks/types'

import { getAllWebHooks, removeWebHook } from '../chrome/chrome-actions'

const WebHooksList = () => {

  const dispatch = useDispatch()
  const { webhooks, webhooksGroups, confirmremove, selectedItem } = useSelector((state: IRootState) => state.webHooks)
  const { isDark } = useSelector((state: IRootState) => state.home)

  // set selected items to store
  const [selection] = useState(
    new Selection({
      onSelectionChanged: () => {
        const newSelection = selection.getSelection()
        dispatch(setSelectedItem(newSelection[0] as IWebHook))
      },
    }),
  )

  // load initial data
  useEffect(() => {
    getAllWebHooks(dispatch)
  }, [dispatch])

  const detailsListColumns: IColumn[] = [
    { key: 'expirationDateTime', name: 'Expiration date', fieldName: 'expirationDateTime', minWidth: 100, maxWidth: 200, isResizable: true },
    { key: 'notificationUrl', name: 'Server notification URL', fieldName: 'notificationUrl', minWidth: 100, maxWidth: 200, isResizable: true },
    { key: 'clientState', name: 'Client State', fieldName: 'clientState', minWidth: 100, maxWidth: 200, isResizable: true },
  ]

  // make columns sticky
  const renderHeader = (headerProps: any, defaultRender: any) => {
    return (
      <Sticky
        stickyPosition={StickyPositionType.Header}
        isScrollSynced={true}
      >
        {defaultRender(headerProps)}
      </Sticky>
    )
  }

  return (
    <>
      <ScrollablePane>
        <DetailsList
          items={webhooks}
          selection={selection}
          groups={webhooksGroups}
          columns={detailsListColumns}
          ariaLabelForSelectAllCheckbox='Toggle selection for all items'
          ariaLabelForSelectionColumn='Toggle selection'
          checkButtonAriaLabel='Row checkbox'
          onRenderDetailsHeader={renderHeader}
          selectionMode={SelectionMode.single}
          groupProps={{
            showEmptyGroups: false,
            isAllGroupsCollapsed: false,
          }}
          compact={false}
          onItemInvoked={(item: IWebHook) => {
            dispatch(setSelectedItem(item))
            dispatch(setEditPanel(true))
          }}
        />
      </ScrollablePane>

      <Dialog
        hidden={confirmremove}
        onDismiss={() => dispatch(setConfirmRemoveDialog(true))}
        dialogContentProps={{
          showCloseButton: true,
          type: DialogType.normal,
          title: 'Remove webhook',
          closeButtonAriaLabel: 'Cancel',
          subText: `Sure you want to remove this '${selectedItem?.notificationUrl}' webhook?`,
        }}
        modalProps={{
          isDarkOverlay: isDark,
        }}
      >
        <DialogFooter>
          <PrimaryButton onClick={() => removeWebHook(dispatch, selectedItem!)} text='Remove' />
          <DefaultButton onClick={() => dispatch(setConfirmRemoveDialog(true))} text='Cancel' />
        </DialogFooter>
      </Dialog>
    </>
  )
}

export default WebHooksList
