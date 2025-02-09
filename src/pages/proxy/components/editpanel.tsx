import { Checkbox, Dropdown, IDropdownOption, IOverlayProps, Label, Panel, PanelType, PrimaryButton, Separator, Stack, TextField } from '@fluentui/react';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { IRootState } from '../../../store';
import { setEditPanel, setSelectedItem } from '../../../store/proxy/actions';
import { IProxy } from '../../../store/proxy/types';
import { addProxy } from '../chrome/chrome-actions';

const ProxyEditPanel = () => {
  const dispatch = useDispatch();
  const { isDark } = useSelector((state: IRootState) => state.home);
  const { editpanel, proxies, enabled } = useSelector((state: IRootState) => state.proxy);

  const [localProxy, setLocalProxy] = useState<IProxy>(proxies[0]);

  useEffect(() => {
    setLocalProxy(proxies[0]);
  }, [proxies]);

  const panelOverlayProps: IOverlayProps = { isDarkThemed: isDark };
  const _onRenderItemFooterContent = () => {
    return (
      <PrimaryButton
        onClick={() => {
          dispatch(setSelectedItem(localProxy))
          dispatch(setEditPanel(false));
        }}
        style={{ marginRight: '8px' }}
        text={'Update'}
      />
    );
  };
  const httpMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD'];

  const handleCheckboxChange = (method: string, isChecked: boolean) => {
    const updatedMethods = isChecked
      ? [...localProxy.methods, method]
      : localProxy.methods.filter((m) => m !== method);
  
    setLocalProxy({ ...localProxy, methods: updatedMethods });
  };

  const failRateOptions: IDropdownOption[] = Array.from({ length: 9 }, (_, i) => ({
    key: (i + 1) * 10,
    text: `${(i + 1) * 10}%`,
  }));

  const handleFailRateChange = (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption) => {
    if (option) {
      console.log(option.key as number / 100);
      setLocalProxy({ ...localProxy, failRate: option.key as number / 100 });
    }
  };

  return (
    <Panel
      isOpen={editpanel}
      type={PanelType.smallFixedFar}
      onDismiss={() => {
        dispatch(setEditPanel(false));
      }}
      isLightDismiss={true}
      isFooterAtBottom={true}
      headerText="Edit Proxy"
      closeButtonAriaLabel="Close"
      onRenderFooterContent={_onRenderItemFooterContent}
      overlayProps={panelOverlayProps}
    >
      <Stack tokens={{ childrenGap: 10 }}>
        <TextField
          label="Blocking Url"
          value={localProxy.url}
          onChange={(event, newValue?: string) => {
            setLocalProxy({ ...localProxy, url: newValue ? newValue : '' });
          }}
        />
        <Dropdown
          label="Fail Rate"
          options={failRateOptions}
          selectedKey={localProxy.failRate * 100}
          onChange={handleFailRateChange}
        />
{/*         <Stack tokens={{ childrenGap: 10 }}>
          <Label>Bloking Methods</Label>
          <Stack tokens={{ childrenGap: 10 }}>
            {httpMethods.map((method, index) =>
              index % 2 === 0 ? (
                <Stack key={method} horizontal tokens={{ childrenGap: 10 }}>
                  <Checkbox
                    styles={{ root: { width: 70 } }}
                    label={method}
                    checked={localProxy.methods.includes(method)}
                    onChange={(e, isChecked) => handleCheckboxChange(method, isChecked!)}
                  />
                  {httpMethods[index + 1] && (
                    <Checkbox
                      label={httpMethods[index + 1]}
                      checked={localProxy.methods.includes(httpMethods[index + 1])}
                      onChange={(e, isChecked) => handleCheckboxChange(httpMethods[index + 1], isChecked!)}
                    />
                  )}
                </Stack>
              ) : null
            )}
          </Stack>
        </Stack> */}
        <TextField
          label="Response Status"
          type="number"
          value={localProxy.status.toString()}
          onChange={(e, newValue) => setLocalProxy({ ...localProxy, status: newValue ? parseInt(newValue, 10) : 0 })}
        />
        <TextField
          label="Response Status Text"
          value={localProxy.statusText}
          onChange={(e, newValue) => setLocalProxy({ ...localProxy, statusText: newValue ? newValue : '' })}
        />
        <TextField
          label="Response Headers"
          multiline
          autoAdjustHeight
          value={JSON.stringify(localProxy.responseHeaders, null, 2)}
          onChange={(e, newValue) => setLocalProxy({ ...localProxy, responseHeaders: newValue ? JSON.parse(newValue) : {} })}
        />
      </Stack>
    </Panel>
  );
};

export default ProxyEditPanel;