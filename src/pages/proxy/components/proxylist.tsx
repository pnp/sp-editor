import {
  ActionButton,
  DetailsList,
  IColumn,
  ScrollablePane,
  SelectionMode,
  Sticky,
  StickyPositionType,
} from '@fluentui/react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../../store';
import { setEditPanel } from '../../../store/proxy/actions';
import { IProxy } from '../../../store/proxy/types';

const ProxyList = () => {
  const dispatch = useDispatch();
  const { proxies } = useSelector((state: IRootState) => state.proxy);
  const { isDark } = useSelector((state: IRootState) => state.home);
  
  const detailsListColumns: IColumn[] = [
    {
      key: 'empty',
      name: '',
      fieldName: 'empty',
      minWidth: 1,
      maxWidth: 1,
      isResizable: false,
    },
    {
      key: 'editproxy',
      name: '',
      minWidth: 16,
      maxWidth: 16,
      isPadded: true,
      isResizable: false,
      onRender: (item) => (
        <ActionButton
          iconProps={{ iconName: 'Edit', style: { width: '16px', height: '16px' }, title: 'Copy value to clipboard' }}
          onClick={() => dispatch(setEditPanel(true))
          }
          styles={{
            root: {
              marginLeft: 'auto',
              backgroundColor: 'transparent',
              height: '6px', // Set a fixed height
              verticalAlign: 'middle', // Align the button to the center
              minWidth: 'auto', // Ensure the button width is minimal
            },
          }}
        ></ActionButton>
      ),
    },
    {
      data: 'number',
      fieldName: 'failRate',
      isPadded: false,
      isResizable: true,
      isRowHeader: true,
      key: 'failRate',
      maxWidth: 50,
      minWidth: 50,
      name: 'Fail Rate',
      onRender: (item: IProxy) => <div>{(item.failRate * 100).toFixed(0)}%</div>,
    },
    {
      data: 'string',
      fieldName: 'url',
      isPadded: false,
      isResizable: true,
      isRowHeader: true,
      key: 'url',
      maxWidth: 300,
      minWidth: 300,
      name: 'Url',
    },
    {
      data: 'number',
      fieldName: 'status',
      isPadded: false,
      isResizable: true,
      isRowHeader: true,
      key: 'status',
      maxWidth: 50,
      minWidth: 50,
      name: 'Status',
    },
    {
      data: 'string',
      fieldName: 'statusText',
      isPadded: false,
      isResizable: true,
      isRowHeader: true,
      key: 'statusText',
      minWidth: 50,
      maxWidth: 200,
      name: 'Status Text',
    },
    {
      data: 'string',
      fieldName: 'responseHeaders',
      isPadded: false,
      isResizable: true,
      isRowHeader: true,
      key: 'responseHeaders',
      maxWidth: 350,
      minWidth: 350,
      name: 'Response Headers',
      onRender: (item: IProxy) => <div>{JSON.stringify(item.responseHeaders)}</div>,
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

  return (
    <ScrollablePane>
      <DetailsList
        onShouldVirtualize={() => false}
        items={proxies}
        selectionPreservedOnEmptyClick={true}
        columns={detailsListColumns}
        selectionMode={SelectionMode.none}
        setKey="proxylist"
        isHeaderVisible={true}
        enterModalSelectionOnTouch={true}
        onRenderDetailsHeader={renderHeader}
        onItemInvoked={(item: IProxy) => {
          dispatch(setEditPanel(true));
        }}
      />
    </ScrollablePane>
  );
};

export default ProxyList;
