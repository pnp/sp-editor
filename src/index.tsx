import { initializeIcons } from '@fluentui/react/lib/Icons'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import * as serviceWorker from './serviceWorker'
import store from './store'
import { MsalProvider } from '@azure/msal-react';
import { AuthenticationResult, Configuration, EventType, LogLevel, PublicClientApplication } from '@azure/msal-browser'

export const msalConfig: Configuration = {
  auth: {
      clientId: "20d34c96-396e-4bf0-a008-472ef10a5099",
      authority: "https://login.microsoftonline.com/common/",
    //  redirectUri: "chrome-extension://nfabmlfkakpniaccknblmcihigllfnne/index.html",
  },
  cache: {
      cacheLocation: "sessionStorage", // This configures where your cache will be stored
  },
  system: {	
      loggerOptions: {	
          loggerCallback: (level, message, containsPii) => {	
              if (containsPii) {		
                  return;		
              }		
              switch (level) {
                  case LogLevel.Error:
                      console.error(message);
                      return;
                  case LogLevel.Info:
                      console.info(message);
                      return;
                  case LogLevel.Verbose:
                      console.debug(message);
                      return;
                  case LogLevel.Warning:
                      console.warn(message);
                      return;
                  default:
                      return;
              }	
          }	
      },
      allowRedirectInIframe: true
  }
};

/**
* Scopes you add here will be prompted for user consent during sign-in.
* By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
* For more information about OIDC scopes, visit: 
* https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
*/
export const loginRequest = {
  scopes: ["User.Read", "Mail.Read"]
};

const msalInstance = new PublicClientApplication(msalConfig);

msalInstance.addEventCallback(event => {
  if(event.eventType === EventType.LOGIN_SUCCESS){
    const payload = event.payload as AuthenticationResult;
    msalInstance.setActiveAccount(payload.account)
  }
})

initializeIcons();

// this is to catch chrome developertools shortcut
// add all keykeyCodes to block the shorcuts
document.addEventListener('keydown', function(e) {
  switch (e.keyCode) {
    case 191:
      e.stopImmediatePropagation()
      break
  }
  return
}, true)

// @ts-ignore: this is the only way to make it work
window.require.config({
  paths: {
    vs: '/vs',
  },
})

// @ts-ignore: this is the only way to make it work
window.MonacoEnvironment = {
  getWorkerUrl: (workerId: any, label: any) => {
    return 'worker-loader-proxy.js'
  },
} as any

// @ts-ignore: this is the only way to make it work
window.require(['vs/editor/editor.main', 'vs/language/typescript/tsWorker'], () => {

  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <MsalProvider instance={msalInstance}>
          <App />
        </MsalProvider>
      </BrowserRouter>
    </Provider>,
    document.getElementById('root'),
  )
})

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
