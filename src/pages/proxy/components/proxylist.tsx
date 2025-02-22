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
import { setEditPanel, setSelectedItem, updateItem } from '../../../store/proxy/actions';
import { IProxy } from '../../../store/proxy/types';
import { IonToggle } from '@ionic/react';

const ProxyList = () => {
  const dispatch = useDispatch();
  const { proxies } = useSelector((state: IRootState) => state.proxy);
  
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
      key: 'enabled',
      name: 'Enabled',
      minWidth: 32,
      maxWidth: 32,
      isPadded: true,
      isResizable: false,
      onRender: (item) => (
        <IonToggle
          onClick={() => {
           dispatch(updateItem({ ...item, enabled: !item.enabled }));
          }}
          checked={item.enabled}
          color="success"
          style={{ verticalAlign: 'middle' }}
        >
        </IonToggle>
      ),
    },
    {
      key: 'editproxy',
      name: 'Edit',
      minWidth: 16,
      maxWidth: 16,
      isPadded: true,
      isResizable: false,
      onRender: (item) => (
        <ActionButton
          iconProps={{ iconName: 'Edit', style: { width: '16px', height: '16px' }, title: 'Edit proxy' }}
          onClick={() => {
            dispatch(setSelectedItem(item));
            dispatch(setEditPanel(true));
          }}
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
      data: 'string',
      fieldName: 'methods',
      isPadded: false,
      isResizable: true,
      isRowHeader: true,
      key: 'methods',
      maxWidth: 150,
      minWidth: 150,
      name: 'Methods',
      onRender: (item: IProxy) => <div>{item.methods.join(', ')}</div>,
    },
    {
      data: 'number',
      fieldName: 'failRate',
      isPadded: false,
      isResizable: true,
      isRowHeader: true,
      key: 'failRate',
      maxWidth: 60,
      minWidth: 60,
      name: 'Fail Rate',
      onRender: (item: IProxy) => <div>{(item.failRate * 100).toFixed(0)}%</div>,
    },
    {
      data: 'number',
      fieldName: 'status',
      isPadded: false,
      isResizable: true,
      isRowHeader: true,
      key: 'status',
      maxWidth: 120,
      minWidth: 120,
      name: 'Response status',
    },
    {
      data: 'string',
      fieldName: 'description',
      isPadded: false,
      isResizable: true,
      isRowHeader: true,
      key: 'description',
      maxWidth: 300,
      minWidth: 300,
      name: 'Description',
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
      />
    </ScrollablePane>
  );
};

export default ProxyList;
