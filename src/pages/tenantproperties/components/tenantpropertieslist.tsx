import {
  DefaultButton,
  DetailsList,
  DetailsListLayoutMode,
  Dialog,
  DialogFooter,
  DialogType,
  IColumn,
  MarqueeSelection,
  PrimaryButton,
  ScrollablePane,
  SelectionMode,
  Sticky,
  StickyPositionType,
} from '@fluentui/react';
import { Selection } from '@fluentui/react/lib/Utilities';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../../store';
import {
  setConfirmRemoveDialog,
  setEditPanel,
  setSelectedItem,
  setSelectedItems,
} from '../../../store/tenantproperties/actions';
import { ITenantProperty } from '../../../store/tenantproperties/types';
import { getAllTenantProperties, removeTenantProperties } from '../chrome/chrome-actions';

const TenantPropertiesList = () => {
  const dispatch = useDispatch();
  const { tenantproperties, selectedItems, confirmremove, searchstring } = useSelector(
    (state: IRootState) => state.tenantProperties
  );
  const { isDark } = useSelector((state: IRootState) => state.home);

  const [sortkey, setSortkey] = useState('webkey');
  const [keyAsc, setKeyAsc] = useState(true);

  // set selected items to store
  const [selection] = useState(
    new Selection({
      onSelectionChanged: () => {
        const newSelection = selection.getSelection() as typeof selectedItems;
        dispatch(setSelectedItems(newSelection));
      },
    })
  );

  // load initial data
  useEffect(() => {
    getAllTenantProperties(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // clear selection after every update on tenantproperties
  useEffect(() => {
    selection.setAllSelected(false);
    dispatch(setSelectedItems([]));
    setKeyAsc(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tenantproperties]);

  const onColumnClick = (_e: any, { key }: any) => {
    if (key === 'tenantkey') {
      tenantproperties.sort((a, b) =>
        a.key.toLocaleLowerCase() < b.key.toLocaleLowerCase()
          ? keyAsc
            ? 1
            : -1
          : b.key.toLocaleLowerCase() < a.key.toLocaleLowerCase()
          ? keyAsc
            ? -1
            : 1
          : 0
      );
      setKeyAsc(!keyAsc);
    }
    setSortkey(key);

    selection.setAllSelected(false);
    dispatch(setSelectedItems([]));
  };

  const filteredProps = tenantproperties.filter(
    (prop) => prop.key.toLocaleLowerCase().indexOf(searchstring.toLocaleLowerCase()) > -1
  );

  const detailsListColumns: IColumn[] = [
    {
      data: 'string',
      fieldName: 'key',
      isPadded: true,
      isResizable: true,
      isRowHeader: true,
      isSorted: sortkey === 'tenantkey',
      isSortedDescending: keyAsc,
      key: 'tenantkey',
      maxWidth: 280,
      minWidth: 160,
      name: `Property (${filteredProps.length})`,
      onColumnClick,
    },
    {
      data: 'string',
      fieldName: 'value',
      isPadded: true,
      isResizable: true,
      isRowHeader: true,
      key: 'tenantvalue',
      maxWidth: 450,
      minWidth: 160,
      name: 'Value',
      isMultiline: true,
      isCollapsable: false,
    },
    {
      data: 'string',
      fieldName: 'description',
      isPadded: true,
      isResizable: true,
      isRowHeader: true,
      key: 'tenantdescription',
      maxWidth: 450,
      minWidth: 160,
      name: 'Description',
      isMultiline: true,
      isCollapsable: false,
    },
    {
      data: 'string',
      fieldName: 'comment',
      isPadded: true,
      isResizable: true,
      isRowHeader: true,
      key: 'tenantcomment',
      maxWidth: 250,
      minWidth: 160,
      name: 'Comment',
      isMultiline: true,
      isCollapsable: false,
    },
  ];

  // make columns sticky
  const renderHeader = (headerProps: any, defaultRender: any) => {
    return (
      <Sticky stickyPosition={StickyPositionType.Header} isScrollSynced={true}>
        {defaultRender(headerProps)}
      </Sticky>
    );
  };

  // render custom column (indexed) with icon
  const _renderItemColumn = (item?: any, index?: number | undefined, column?: IColumn | undefined) => {
    const fieldContent = item[column?.fieldName as keyof ITenantProperty] as string;

    return <span>{fieldContent}</span>;
  };

  return (
    <>
      <ScrollablePane>
        <MarqueeSelection selection={selection} isEnabled={true}>
          <DetailsList
            layoutMode={DetailsListLayoutMode.justified}
            onShouldVirtualize={() => false}
            items={filteredProps}
            selection={selection}
            selectionPreservedOnEmptyClick={true}
            columns={detailsListColumns}
            selectionMode={SelectionMode.single}
            getKey={(item: ITenantProperty) => {
              return item.key;
            }}
            setKey="Tenantset"
            isHeaderVisible={true}
            enterModalSelectionOnTouch={true}
            onItemInvoked={(item: ITenantProperty) => {
              dispatch(setSelectedItem(item));
              dispatch(setEditPanel(true));
            }}
            onRenderDetailsHeader={renderHeader}
            onRenderItemColumn={_renderItemColumn}
          />
        </MarqueeSelection>
      </ScrollablePane>

      <Dialog
        hidden={confirmremove} // Dialog for Remove
        onDismiss={() => dispatch(setConfirmRemoveDialog(true))}
        dialogContentProps={{
          showCloseButton: true,
          type: DialogType.normal,
          title: 'Remove tenant property',
          closeButtonAriaLabel: 'Cancel',
          subText:
            selectedItems.length > 1
              ? `Sure you want to remove these ${selectedItems.length} selected tenant properties?`
              : `Sure you want to remove the "${
                  selectedItems && selectedItems.length > 0 ? selectedItems[0].key : ''
                }" tenant property?`,
        }}
        modalProps={{
          isDarkOverlay: isDark,
        }}
      >
        <DialogFooter>
          <PrimaryButton onClick={() => removeTenantProperties(dispatch, selectedItems)} text="Remove" />
          <DefaultButton onClick={() => dispatch(setConfirmRemoveDialog(true))} text="Cancel" />
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default TenantPropertiesList;
