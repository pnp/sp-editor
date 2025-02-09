import { CommandBar } from '@fluentui/react'
import { useDispatch, useSelector } from 'react-redux'
import { addProxy } from '../chrome/chrome-actions'
import { IonToggle } from '@ionic/react'
import { IRootState } from '../../../store'
import { setEnabled } from '../../../store/proxy/actions'
import { useEffect } from 'react'

const ProxyCommands = () => {
  const dispatch = useDispatch();
  const { proxies, enabled } = useSelector((state: IRootState) => state.proxy);

  useEffect(() => {
    if (enabled) {
      addProxy(dispatch, proxies, true);
    }
  }, [proxies]);

  return (
    <CommandBar
      items={[
        {
          key: 'enableProxy',
          onRenderIcon: () => (
            <IonToggle
              onClick={() => {
                addProxy(dispatch, !enabled ? proxies : [], false);
                dispatch(setEnabled(!enabled));
              }}
              checked={enabled}
              color="success"
              labelPlacement="end"
            >
              {enabled ? 'Disable' : 'Enable'}
            </IonToggle>
          ),
        },
      ]}
    />
  );
}

export default ProxyCommands
