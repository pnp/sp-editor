import {
  Checkbox,
  ComboBox,
  IStackStyles,
  Panel,
  PanelType,
  ScrollablePane,
  ScrollbarVisibility,
  Stack,
  TextField,
  Text,
} from '@fluentui/react';
import { setOptionsPanel, setSearchQuery } from '../../../store/search/actions';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../../store';
import { ISort, SortDirection } from '@pnp/sp/search';

const SearchQueryForm = () => {
  const dispatch = useDispatch();

  const { searchQuery, optionsPanel } = useSelector((state: IRootState) => state.search);
  const { isDark } = useSelector((state: IRootState) => state.home);

  const sourceIds = [
    {
      key: 'e7ec8cee-ded8-43c9-beb5-436b54b31e84',
      text: 'Documents',
    },
    {
      key: '5dc9f503-801e-4ced-8a2c-5d1237132419',
      text: 'ItemsMatchingContentType',
    },
    {
      key: 'e1327b9c-2b8c-4b23-99c9-3730cb29c3f7',
      text: 'ItemsMatchingTag',
    },
    {
      key: '48fec42e-4a92-48ce-8363-c2703a40e67d',
      text: 'ItemsRelatedToCurrentUser',
    },
    {
      key: '5c069288-1d17-454a-8ac6-9c642a065f48',
      text: 'ItemsWithSameKeywordAsThisItem',
    },
    {
      key: 'b09a7990-05ea-4af9-81ef-edfab16c4e31',
      text: 'LocalPeopleResults',
    },
    {
      key: '203fba36-2763-4060-9931-911ac8c0583b',
      text: 'LocalReportsAndDataResults',
    },
    {
      key: '8413cd39-2156-4e00-b54d-11efd9abdb89',
      text: 'LocalSharePointResults',
    },
    {
      key: '78b793ce-7956-4669-aa3b-451fc5defebf',
      text: 'LocalVideoResults',
    },
    {
      key: '5e34578e-4d08-4edc-8bf3-002acf3cdbcc',
      text: 'Pages',
    },
    {
      key: '38403c8c-3975-41a8-826e-717f2d41568a',
      text: 'Pictures',
    },
    {
      key: '97c71db1-58ce-4891-8b64-585bc2326c12',
      text: 'Popular',
    },
    {
      key: 'ba63bbae-fa9c-42c0-b027-9a878f16557c',
      text: 'RecentlyChangedItems',
    },
    {
      key: 'ec675252-14fa-4fbe-84dd-8d098ed74181',
      text: 'RecommendedItems',
    },
    {
      key: '9479bf85-e257-4318-b5a8-81a180f5faa1',
      text: 'Wiki',
    },
  ];

  const options = [
    'EnableInterleaving',
    'EnableStemming',
    'TrimDuplicates',
    'EnableNicknames',
    'EnableFQL',
    'EnablePhonetic',
    'BypassResultTypes',
    'ProcessBestBets',
    'EnableQueryRules',
    'EnableSorting',
    'GenerateBlockRankLog',
    'ProcessPersonalFavorites',
  ];

  const checkBoxStyles: IStackStyles = {
    root: {
      marginTop: 10,
    },
  };

  function convertToSortList(sortListStr: string): ISort[] | null {
    try {
      const newSortList: ISort[] = sortListStr.split(',').map((sortItem) => {
        const [property, direction] = sortItem.split(':');
        return {
          Property: property,
          Direction: direction === '0' ? SortDirection.Ascending : SortDirection.Descending,
        };
      });
      return newSortList;
    } catch (error) {
      console.error('Error converting to sort list:', error);
      return null;
    }
  }

  return (
    <>
      <ScrollablePane
        scrollbarVisibility={ScrollbarVisibility.always}
        style={{
          width: '500px',
          marginLeft: '5px',
          marginTop: '50px',
          marginBottom: '25px',
          backgroundColor: 'transparent',
        }}
      >
        <Stack enableScopedSelectors horizontal>
          <Stack.Item disableShrink style={{ width: '300px', marginRight: '25px' }}>
            <TextField
              spellCheck={false}
              label="Queryt"
              placeholder="eg. contentClass:STS_List_*"
              multiline
              value={searchQuery.Querytext}
              autoAdjustHeight
              onChange={(event, newValue?: string) =>
                dispatch(
                  setSearchQuery({
                    ...searchQuery,
                    Querytext: newValue ? newValue : '',
                  })
                )
              }
            />
            <TextField
              spellCheck={false}
              label="RowLimit"
              value={searchQuery.RowLimit ? searchQuery.RowLimit.toString() : ''}
              onChange={(event, newValue?: string) => {
                const parsedValue = parseInt(newValue || '');
                const rowLimit = isNaN(parsedValue) ? undefined : parsedValue; // Check if parsedValue is NaN and set rowLimit to null if it is
                dispatch(setSearchQuery({ ...searchQuery, RowLimit: rowLimit }));
              }}
            />
            <TextField
              spellCheck={false}
              label="StartRow"
              value={searchQuery.StartRow ? searchQuery.StartRow.toString() : ''}
              onChange={(event, newValue?: string) => {
                const parsedValue = parseInt(newValue || '');
                const startRow = isNaN(parsedValue) ? undefined : parsedValue; // Check if parsedValue is NaN and set rowLimit to null if it is
                dispatch(setSearchQuery({ ...searchQuery, StartRow: startRow }));
              }}
            />
            <TextField
              autoAdjustHeight
              multiline
              spellCheck={false}
              value={searchQuery.SelectProperties?.join(',')}
              label="SelectedProperties"
              placeholder="eg. Title,contentclass"
              onChange={(event, newValue?: string) => {
                dispatch(setSearchQuery({ ...searchQuery, SelectProperties: newValue ? [newValue] : [] }));
              }}
            />
            <TextField
              autoAdjustHeight
              multiline
              spellCheck={false}
              label="SortList"
              defaultValue={
                searchQuery.SortList
                  ? searchQuery.SortList.map((sortItem) => `${sortItem.Property}:${sortItem.Direction}`).join(',')
                  : undefined
              }
              placeholder="eg. firstName:0,LastName:1"
              onChange={(event, newValue?: string) => {
                const newSortList = convertToSortList(newValue || ''); // fix this not to allow empty strings
                if (newSortList && newSortList.length > 0)
                  dispatch(setSearchQuery({ ...searchQuery, SortList: newSortList }));
                else dispatch(setSearchQuery({ ...searchQuery, SortList: [] }));
              }}
            />
            <TextField
              autoAdjustHeight
              multiline
              spellCheck={false}
              defaultValue={searchQuery.RefinementFilters ? searchQuery.RefinementFilters.join(',') : ''}
              label="RefinementFilters"
              placeholder='eg. and(lastname:equals("burr"),firstname:equals("bill"))'
              onChange={(event, newValue?: string) => {
                dispatch(setSearchQuery({ ...searchQuery, RefinementFilters: newValue ? [newValue] : [] }));
              }}
            />
            <ComboBox
              spellCheck={false}
              label="SourceId"
              placeholder="eg. b09a7990-05ea-4af9-81ef-edfab16c4e31"
              options={sourceIds}
              defaultSelectedKey={sourceIds.find((item) => item.key === searchQuery.SourceId)?.key ?? null}
              allowFreeform
              onChange={(event, option?: any, index?: any, value?: any) => {
                console.log(option, index, value);
                dispatch(
                  setSearchQuery({
                    ...searchQuery,
                    SourceId: option?.key ?? value ?? null,
                  })
                );
              }}
            />
          </Stack.Item>
        </Stack>
      </ScrollablePane>
      <Panel
        isOpen={optionsPanel}
        onDismiss={() => {
          dispatch(setOptionsPanel(false));
        }}
        type={PanelType.medium}
        headerText="Options"
        isBlocking={false}
        closeButtonAriaLabel="Close"
      >
        <Stack horizontal tokens={{ childrenGap: 20 }}>
          <Stack.Item grow>
            {options.map((key) => {
              return (
                <Checkbox
                  key={key}
                  styles={checkBoxStyles}
                  label={key}
                  // @ts-ignore
                  indeterminate={searchQuery[key] === undefined}
                  // @ts-ignore
                  checked={searchQuery[key] === undefined ? true : searchQuery[key]}
                  // @ts-ignore
                  defaultChecked={searchQuery[key]}
                  onChange={(ev?: React.FormEvent<HTMLElement | HTMLInputElement>, newChecked?: boolean) => {
                    // @ts-ignore
                    if (searchQuery[key] !== undefined && newChecked) {
                      const newItems = { ...searchQuery };
                      // @ts-ignore
                      delete newItems[key];
                      dispatch(setSearchQuery(newItems));
                    } else {
                      dispatch(setSearchQuery({ ...searchQuery, [key]: newChecked }));
                    }
                  }}
                />
              );
            })}
          </Stack.Item>
          <Stack.Item grow>
            <Text variant={'medium'}>Payload preview</Text>
            <pre spellCheck="false" style={{ color: isDark ? 'white' : 'black' }}>
              {JSON.stringify(searchQuery, null, 2)}
            </pre>{' '}
          </Stack.Item>
        </Stack>
      </Panel>
    </>
  );
};

export default SearchQueryForm;
