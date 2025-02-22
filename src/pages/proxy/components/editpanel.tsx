import {
  Dropdown,
  IDropdownOption,
  IOverlayProps,
  Panel,
  PanelType,
  PrimaryButton,
  Stack,
  TextField,
} from '@fluentui/react';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { IRootState } from '../../../store';
import { addItem, removeItem, setEditPanel, setSelectedItem, updateItem } from '../../../store/proxy/actions';
import { IProxy } from '../../../store/proxy/types';

const ProxyEditPanel = () => {
  const dispatch = useDispatch();
  const { isDark } = useSelector((state: IRootState) => state.home);
  const { editpanel, selectedItem } = useSelector((state: IRootState) => state.proxy);
  
  const createDefaultProxy = (): IProxy => ({
    id: Date.now().toString(),
    methods: ['ALL'],
    failRate: 0.0,
    url: '/_api/',
    status: '200',
    statusText: 'OK',
    responseHeaders: {
      'Content-Type': 'application/json',
    },
    responseBody: {
      message: 'Success',
    },
    description: '',
  });

  const [localProxy, setLocalProxy] = useState<IProxy>(createDefaultProxy());
  const [sampleData, setSampleData] = useState<any>(undefined);
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (selectedItem) {
      setLocalProxy(selectedItem);
    } else {
      setLocalProxy(createDefaultProxy());
    }
  }, [selectedItem]);

  useEffect(() => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const timeout = setTimeout(() => {
      const fetchGraphData = async () => {
        if (localProxy.url.includes('https://graph.microsoft.com')) {
          const encodedUrl = encodeURIComponent(localProxy.url);
          const url = `https://graph.office.net/en-us/graph/api/proxy?url=${encodedUrl}`;
          const token = '{token:https://graph.microsoft.com/}';

          try {
            const response = await fetch(url, {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            });

            if (!response.ok) {
              setSampleData(undefined);
              return;
            }

            const data = await response.json();
            setSampleData(data);
          } catch (error) {
            setSampleData(undefined);
          }
        }
      };

      fetchGraphData();
    }, 500); // Wait for 500ms before fetching data

    setDebounceTimeout(timeout);

    return () => {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }
    };
  }, [localProxy.url]);

  const panelOverlayProps: IOverlayProps = { isDarkThemed: isDark };

  const _onRenderItemFooterContent = () => {
    return (
      <Stack horizontal>
        <PrimaryButton
          onClick={() => {
            if (selectedItem) {
              dispatch(updateItem(localProxy));
            } else {
              dispatch(addItem({ ...localProxy, id: Date.now().toString() }));
            }
            dispatch(setSelectedItem(undefined));
            dispatch(setEditPanel(false));
          }}
          style={{ marginRight: '8px' }}
          text={selectedItem ? 'Update' : 'Create'}
        />
        {selectedItem && (
          <PrimaryButton
            onClick={() => {
              dispatch(removeItem(localProxy));
              dispatch(setSelectedItem(undefined));
              dispatch(setEditPanel(false));
            }}
            style={{ marginRight: '8px' }}
            text={'Delete'}
            disabled={selectedItem.id === '1' || selectedItem.id === '2'}
          />
        )}
      </Stack>
    );
  };

  const failRateOptions: IDropdownOption[] = Array.from({ length: 11 }, (_, i) => ({
    key: i * 10,
    text: `${i * 10}%`,
  }));

  const handleFailRateChange = (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption) => {
    if (option) {
      setLocalProxy({ ...localProxy, failRate: (option.key as number) / 100 });
    }
  };

  const validateNumber = (value: string): string => {
    return isNaN(Number(value)) ? 'Please enter a valid number' : '';
  };

  return (
    <Panel
      isOpen={editpanel}
      type={PanelType.largeFixed}
      onDismiss={() => {
        dispatch(setSelectedItem(undefined));
        dispatch(setEditPanel(false));
      }}
      isLightDismiss={true}
      isFooterAtBottom={true}
      headerText={selectedItem ? 'Edit Proxy' : 'Create Proxy'}
      closeButtonAriaLabel="Close"
      onRenderFooterContent={_onRenderItemFooterContent}
      overlayProps={panelOverlayProps}
      onRenderFooter={(footerProps, defaultRender) => (
        <div style={{ position: 'sticky', bottom: 0 }}>{defaultRender?.(footerProps)}</div>
      )}
    >
      <Stack tokens={{ childrenGap: 10 }}>
        <Stack horizontal tokens={{ childrenGap: 10 }} styles={{ root: { alignItems: 'end' } }}>
          <TextField
            label="Blocking Url"
            value={localProxy.url}
            onChange={(event, newValue?: string) => {
              setLocalProxy({ ...localProxy, url: newValue ?? '' });
            }}
            styles={{ root: { flexGrow: 1 } }}
          />
          <PrimaryButton
            text="Sample response available, click to load"
            onClick={() => {
              if (sampleData) {
                setLocalProxy({ ...localProxy, responseBody: sampleData });
              }
            }}
            styles={{ root: { height: '100%' } }}
            disabled={!sampleData}
          />
        </Stack>
        <Stack horizontal tokens={{ childrenGap: 10 }}>
          <TextField
            label="Response Status"
            value={localProxy.status.toString()}
            onGetErrorMessage={validateNumber}
            onChange={(e, newValue) => {
              setLocalProxy({ ...localProxy, status: newValue ?? '' });
            }}
          />
          <TextField
            label="Response Status Text"
            value={localProxy.statusText}
            onChange={(e, newValue) => setLocalProxy({ ...localProxy, statusText: newValue ?? '' })}
          />
          <Dropdown
            label="Block Rate"
            options={failRateOptions}
            selectedKey={localProxy.failRate * 100}
            onChange={handleFailRateChange}
          />
          <Dropdown
            label="Methods"
            multiSelect
            options={[
              { key: 'ALL', text: 'ALL' },
              { key: 'GET', text: 'GET' },
              { key: 'POST', text: 'POST' },
              { key: 'PUT', text: 'PUT' },
              { key: 'DELETE', text: 'DELETE' },
              { key: 'PATCH', text: 'PATCH' },
            ]}
            styles={{
              dropdown: { width: 300 },
              dropdownItem: { color: isDark ? 'white' : 'black' },
              dropdownItemSelected: { color: isDark ? 'white' : 'black' },
            }}
            selectedKeys={localProxy.methods}
            onChange={(e, option) => {
              if (option) {
                let methods;
                if (option.key === 'ALL') {
                  methods = localProxy.methods.includes('ALL') ? [] : ['ALL'];
                } else {
                  methods = localProxy.methods.includes(option.key as string)
                    ? localProxy.methods.filter((method) => method !== option.key)
                    : [...localProxy.methods.filter((method) => method !== 'ALL'), option.key as string];
                }
                setLocalProxy({ ...localProxy, methods });
              }
            }}
          />
        </Stack>
        <TextField
          label="Description"
          autoAdjustHeight
          value={localProxy.description}
          onChange={(e, newValue) => setLocalProxy({ ...localProxy, description: newValue ?? '' })}
          styles={{ root: { width: '100%' } }}
        />
        <TextField
          label="Response Headers"
          multiline
          autoAdjustHeight
          value={JSON.stringify(localProxy.responseHeaders, null, 2)}
          onChange={(e, newValue) =>
            setLocalProxy({ ...localProxy, responseHeaders: newValue ? JSON.parse(newValue) : {} })
          }
          styles={{ root: { width: '100%' } }}
        />
        <Stack horizontal tokens={{ childrenGap: 10 }}>
          <TextField
            label="Response Body"
            multiline
            autoAdjustHeight
            value={JSON.stringify(localProxy.responseBody, null, 2)}
            onChange={(e, newValue) =>
              setLocalProxy({ ...localProxy, responseBody: newValue ? JSON.parse(newValue) : {} })
            }
            styles={{ root: { width: '100%' } }}
          />
        </Stack>
      </Stack>
    </Panel>
  );
};

export default ProxyEditPanel;