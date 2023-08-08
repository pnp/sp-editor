import { ComboBox, DefaultPalette, DetailsList, Dropdown, FocusTrapZone, IColumn, IDetailsList, IGroup, IStackItemStyles, IStackStyles, Panel, Pivot, PivotItem, ScrollablePane, ScrollbarVisibility, Separator, Stack, TextField } from '@fluentui/react'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IRootState } from '../../../store'

const SearchResults = () => {

  interface IDetailsListGroupedExampleItem {
    key: string;
    name: string;
    color: string;
  }

  const [items, setItems] = React.useState<IDetailsListGroupedExampleItem[]>([
    { key: 'a', name: 'a', color: 'red' },
    { key: 'b', name: 'b', color: 'red' },
    { key: 'c', name: 'c', color: 'blue' },
    { key: 'd', name: 'd', color: 'blue' },
    { key: 'e', name: 'e', color: 'blue' },
  ]);

  const [groups, setGroups] = React.useState([
    { key: 'groupred0', name: 'documents 1', startIndex: 0, count: 2, level: 0, },
    { key: 'groupgreen2', name: 'page 2', startIndex: 2, count: 0, level: 0 },
    { key: 'groupblue2', name: 'Tomi Tavela', startIndex: 2, count: 3, level: 0 },
  ]);

  const root = React.useRef<IDetailsList>(null);
  const [columns] = React.useState<IColumn[]>([
    { key: 'name', name: 'Name', fieldName: 'name', minWidth: 100, maxWidth: 200, isResizable: true },
    { key: 'color', name: 'Color', fieldName: 'color', minWidth: 100, maxWidth: 200 },
  ]);

  const onRenderColumn = (item: IDetailsListGroupedExampleItem, index: number, column: IColumn) => {
    const value =
      item && column && column.fieldName ? item[column.fieldName as keyof IDetailsListGroupedExampleItem] || '' : '';

    return <div data-is-focusable={true}>{value}</div>;
  };

  const nonShrinkingStackItemStyles: IStackItemStyles = {
    root: {
      alignItems: 'center',
      background: DefaultPalette.themePrimary,
      color: DefaultPalette.white,
      display: 'flex',
      height: 50,
      justifyContent: 'center',
      overflow: 'hidden',
      width: 500,
    },
  };

  const methodStyles: IStackStyles = {
    root: {
      marginLeft: '-11px',
      marginRight: '-11px',
      width: 120,
    },
  }
  return (

    <Stack grow horizontal style={{ height: '100%' }}>
      <Stack.Item disableShrink style={{ width: '300px', marginRight: '10px' }} >

        <Pivot
          style={{
            marginLeft: 24,
            marginRight: 30,
          }}>
          <PivotItem
            alwaysRender={true}
            headerText='Search params'
            style={{
              height: 'calc(100vh - 218px)',
              marginTop: 8,
              marginLeft: -16,
            }}>
            <ScrollablePane scrollbarVisibility={ScrollbarVisibility.always} style={{ width: '300px', marginTop: '100px', marginLeft: '35px' }}>

              <TextField label="Queryt" placeholder="eg. contentClass:STS_List_*" multiline autoAdjustHeight />
              <TextField label="RowLimit" defaultValue='10' />
              <TextField label="StartRow" defaultValue='0' />
              <TextField label="SelectedProperties" placeholder="eg. Title,contentclass" />
              <TextField label="SortList" placeholder="eg. firstName:0,LastName:1" />
              <TextField label="RefinementFilters" placeholder='eg. and(lastname:equals("burr"),firstname:equals("bill"))' />
              <ComboBox
                label="SourceId"
                placeholder='eg. b09a7990-05ea-4af9-81ef-edfab16c4e31'
                options={[
                  { key: 'e7ec8cee-ded8-43c9-beb5-436b54b31e84', text: 'Documents' },
                  { key: '5dc9f503-801e-4ced-8a2c-5d1237132419', text: 'ItemsMatchingContentType' },
                  { key: 'e1327b9c-2b8c-4b23-99c9-3730cb29c3f7', text: 'ItemsMatchingTag' },
                  { key: '48fec42e-4a92-48ce-8363-c2703a40e67d', text: 'ItemsRelatedToCurrentUser' },
                  { key: '5c069288-1d17-454a-8ac6-9c642a065f48', text: 'ItemsWithSameKeywordAsThisItem' },
                  { key: 'b09a7990-05ea-4af9-81ef-edfab16c4e31', text: 'LocalPeopleResults' },
                  { key: '203fba36-2763-4060-9931-911ac8c0583b', text: 'LocalReportsAndDataResults' },
                  { key: '8413cd39-2156-4e00-b54d-11efd9abdb89', text: 'LocalSharePointResults' },
                  { key: '78b793ce-7956-4669-aa3b-451fc5defebf', text: 'LocalVideoResults' },
                  { key: '5e34578e-4d08-4edc-8bf3-002acf3cdbcc', text: 'Pages' },
                  { key: '38403c8c-3975-41a8-826e-717f2d41568a', text: 'Pictures' },
                  { key: '97c71db1-58ce-4891-8b64-585bc2326c12', text: 'Popular' },
                  { key: 'ba63bbae-fa9c-42c0-b027-9a878f16557c', text: 'RecentlyChangedItems' },
                  { key: 'ec675252-14fa-4fbe-84dd-8d098ed74181', text: 'RecommendedItems' },
                  { key: '9479bf85-e257-4318-b5a8-81a180f5faa1', text: 'Wiki' },
                ]}
                allowFreeInput
              />
            </ScrollablePane>
          </PivotItem>
        </Pivot>
      </Stack.Item>
      <Stack.Item style={{ marginLeft: '40px', height: '100vh' }}>
        <Separator vertical />
      </Stack.Item>
      <Stack.Item style={{ width: '100%' }}>
        <Pivot
          style={{
            marginLeft: 27,
          }}>
          <PivotItem
            alwaysRender={true}
            headerText='Results'
            style={{
              height: 'calc(100vh - 218px)',
              marginTop: 8,
            }}>
            <DetailsList
              isHeaderVisible={false}
              checkboxVisibility={2}
              componentRef={root}
              items={items}
              groups={groups}
              columns={columns}
              ariaLabelForSelectAllCheckbox="Toggle selection for all items"
              ariaLabelForSelectionColumn="Toggle selection"
              checkButtonAriaLabel="select row"
              checkButtonGroupAriaLabel="select section"
              groupProps={{
                showEmptyGroups: true,
                isAllGroupsCollapsed: true
              }}
            />
          </PivotItem>
        </Pivot>
      </Stack.Item>
    </Stack>
  )
}

export default SearchResults
