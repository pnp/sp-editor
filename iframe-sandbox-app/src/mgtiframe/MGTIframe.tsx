import React, { useEffect, useState } from 'react';
import { CacheService, Providers, ProviderState, SimpleProvider } from '@microsoft/mgt-react';
import {
  LiveProvider,
  LiveError,
  LivePreview
} from 'react-live';
import * as PREVIEW_REACT from 'react'
import * as PREVIEW_MGT from '@microsoft/mgt'
import * as PREVIEW_MGT_ELEMENT from '@microsoft/mgt-element'
import * as PREVIEW_MGT_REACT from '@microsoft/mgt-react'

export const scope = {
  PREVIEW_REACT,
  PREVIEW_MGT_REACT,
  PREVIEW_MGT,
  PREVIEW_MGT_ELEMENT
}

const MGTIframe = () => {

  const [code, setCode] = useState('');

  const onMessageReceivedFromIframe = React.useCallback(
    (event: any) => {
      let data = JSON.parse(event.data);
      if (data.code) {
        setCode(data.code);
      }
      console.log("onMessageReceivedFromIframe", event.data);
    },
    []
  );

  useEffect(() => {
    window.addEventListener("message", onMessageReceivedFromIframe);
    console.log('registered listener');
    return () => console.log('removing listener, but not');
    // window.removeEventListener("message", onMessageReceivedFromIframe);
  }, [onMessageReceivedFromIframe]);

  CacheService.config.isEnabled = false;

  var getAccessToken = async (scopes: any[]): Promise<string> => {
    return new Promise(function (resolve) {
      window.parent.postMessage(JSON.stringify({
        scopes: scopes,
      }), '*');
      window.addEventListener("message", function dataReady(event) {
        let data = JSON.parse(event.data);
        if (data.token) {
          resolve(data.token);
        }
      });
    });
  };

  var login = async () => {
    Providers.globalProvider.setState(ProviderState.SignedIn);
  };

  var logout = async () => {
    window.parent.postMessage(JSON.stringify({
      logout: true,
    }), '*');
    Providers.globalProvider.setState(ProviderState.SignedOut);
  };

  Providers.globalProvider = new SimpleProvider(getAccessToken, login, logout);

  return (
    <LiveProvider code={code} scope={scope}>
      <LivePreview className='viewer' />
      <LiveError
        className='error' />
    </LiveProvider>
  );
}

export default MGTIframe
