import {
  DefaultButton,
  DetailsList,
  DetailsListLayoutMode,
  Dialog,
  DialogFooter,
  DialogType,
  IColumn,
  MarqueeSelection,
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
  setAllSiteProperties,
  setConfirmRemoveDialog,
  setEditPanel,
  setSearchString,
  setSelectedItem,
  setSelectedItems,
  setSelectedSite,
} from '../../../store/siteproperties/actions';
import { ISiteProperty } from '../../../store/siteproperties/types';
import { getAllSites } from '../chrome/chrome-actions';

const SitePropertiesList = () => {
  const dispatch = useDispatch();
  const { siteproperties, selectedItems, confirmremove, searchstring, selectedSite } = useSelector(
    (state: IRootState) => state.siteProperties
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
    getAllSites(dispatch, selectedSite?.key);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // clear selection after every update on webproperties
  useEffect(() => {
    selection.setAllSelected(false);
    dispatch(setSelectedItems([]));
    setKeyAsc(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [siteproperties]);

  const onColumnClick = (_e: any, { key }: any) => {
    if (key === 'webkey') {
      siteproperties.sort((a, b) =>
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
    // dispatch(setAllWebProperties(webproperties))

    selection.setAllSelected(false);
    dispatch(setSelectedItems([]));
  };

  const filteredProps = siteproperties.filter(
    (prop) => prop.key.toLocaleLowerCase().indexOf(searchstring.toLocaleLowerCase()) > -1
  );

  const detailsListColumns: IColumn[] = [
    {
      data: 'string',
      fieldName: 'key',
      isPadded: true,
      isResizable: true,
      isRowHeader: true,
      isSorted: sortkey === 'webkey',
      isSortedDescending: keyAsc,
      key: 'webkey',
      maxWidth: 300,
      minWidth: 250,
      name: `Property (${filteredProps.length})`,
      onColumnClick,
    },
    {
      data: 'string',
      fieldName: 'value',
      isPadded: true,
      isResizable: true,
      isRowHeader: true,
      key: 'webvalue',
      minWidth: 210,
      name: 'Value',
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
    const fieldContent = item[column?.fieldName as keyof ISiteProperty] as string;

    return <span>{fieldContent}</span>;
  };

  // this will run when the compunent unmounts
  useEffect(() => {
    return () => {
      dispatch(setSearchString(''));
      dispatch(setSelectedSite(undefined));
      dispatch(setAllSiteProperties([]));
    };
  }, [dispatch]);

  return (
    <>
      <ScrollablePane>
        <MarqueeSelection selection={selection} isEnabled={true}>
          <DetailsList
            layoutMode={DetailsListLayoutMode.justified}
            onShouldVirtualize={() => false}
            selection={selection}
            items={filteredProps}
            selectionPreservedOnEmptyClick={true}
            columns={detailsListColumns}
            selectionMode={SelectionMode.multiple}
            setKey="Webset"
            isHeaderVisible={true}
            enterModalSelectionOnTouch={true}
            onItemInvoked={(item: ISiteProperty) => {
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
          title: 'Remove Site property',
          closeButtonAriaLabel: 'Cancel',
          subText:
            selectedItems.length > 1
              ? `Sure you want to remove these ${selectedItems.length} selected site properties?`
              : `Sure you want to remove the "${
                  selectedItems && selectedItems.length > 0 ? selectedItems[0].key : ''
                }" site property?`,
        }}
        modalProps={{
          isDarkOverlay: isDark,
        }}
      >
        <DialogFooter>
          <DefaultButton onClick={() => dispatch(setConfirmRemoveDialog(true))} text="Cancel" />
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default SitePropertiesList;
