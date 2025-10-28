import { getCustomActions } from './pages/scriptlinks/chrome/getscriptlinks';
import { createCustomAction } from './pages/scriptlinks/chrome/createscriptlink';
import { deleteCustomActions } from './pages/scriptlinks/chrome/deletescriptlinks';
import { updateCustomAction } from './pages/scriptlinks/chrome/updatescriptlink';
import { updateCacheCustomAction } from './pages/scriptlinks/chrome/updatescriptlinkcache';
import { addAndInstallApp } from './pages/scriptlinks/chrome/addandinstallapp';
import { unInstallAppFromWeb } from './pages/scriptlinks/chrome/uninstallappfromweb';
import { getWebProperties } from './pages/webproperties/chrome/getwebproperties';
import { createWebProperty } from './pages/webproperties/chrome/createwebproperty';
import { deleteWebProperties } from './pages/webproperties/chrome/deletewebproperties';
import { getFiles } from './pages/fileexplorer/chrome/getfiles';
import { getFileContent } from './pages/fileexplorer/chrome/getFileContent';
import { updateFile } from './pages/fileexplorer/chrome/updateFile';
import { createFolder } from './pages/fileexplorer/chrome/createFolder';
import { deleteFolder } from './pages/fileexplorer/chrome/deleteFolder';
import { createFile } from './pages/fileexplorer/chrome/createFile';
import { deleteFile } from './pages/fileexplorer/chrome/deleteFile';
import { getListProperties } from './pages/listproperties/chrome/getlistproperties';
import { createListProperty } from './pages/listproperties/chrome/createlistproperty';
import { deleteListProperty } from './pages/listproperties/chrome/deletelistproperty';
import { getLists } from './pages/listproperties/chrome/getlists';
import { addProxyScript } from './pages/proxy/chrome/addproxy';
import { shoot } from './pages/spshooter/chrome/shoot';
import { getSiteProperties } from './pages/siteproperties/chrome/getsiteproperties';
import { createSiteProperty } from './pages/siteproperties/chrome/createsiteproperty';
import { getSites } from './pages/siteproperties/chrome/getsites';

console.log('🚀 SP Editor background script loaded');

// Livereload state
let livereloadEnabled = false;

// Livereload injection functions
const injectLivereload = () => {
  let script = document.createElement('script');
  script.src = "https://localhost:35729/livereload.js?snipver=1";
  document.head.appendChild(script);
  return true;
};

const removeLivereload = () => {
  const script = document.querySelector('script[src="https://localhost:35729/livereload.js?snipver=1"]');
  if (script) {
    script.remove();
  }
  if ((window as any).LiveReload) {
    (window as any).LiveReload.connector.disconnect()
  }
  return true;
};

// Context info function
const getContextInfo = () => {
  return (window as any)._spPageContextInfo || ((window as any).moduleLoaderPromise ? (window as any).moduleLoaderPromise.then((e: any) => {
    return (window as any)._spPageContextInfo = e.context._pageContext._legacyPageContext;
  }) : null);
};

// Map of function names to actual functions
const functionMap: Record<string, (...args: any[]) => any> = {
  // Script Links
  getCustomActions,
  createCustomAction,
  deleteCustomActions,
  updateCustomAction,
  updateCacheCustomAction,
  addAndInstallApp,
  unInstallAppFromWeb,
  // Web Properties
  getWebProperties,
  createWebProperty,
  deleteWebProperties,
  // File Explorer
  getFiles,
  getFileContent,
  updateFile,
  createFolder,
  deleteFolder,
  createFile,
  deleteFile,
  // List Properties
  getListProperties,
  createListProperty,
  deleteListProperty,
  getLists,
  // Site Properties
  getSiteProperties,
  createSiteProperty,
  getSites,
  // Proxy
  addProxyScript,
  // Query Builder / SP Shooter
  shoot,
  getContextInfo,
  // Livereload
  injectLivereload,
  removeLivereload,
};

// Auto-inject livereload on tab updates
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (livereloadEnabled && changeInfo.status === 'complete' && tab.active) {
    chrome.scripting.executeScript({
      target: { tabId },
      world: 'MAIN',
      func: injectLivereload,
    }).catch(err => {
      console.error('Failed to auto-inject livereload:', err);
    });
  }
});

// Listen for messages from DevTools
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  // Handle livereload state changes
  if (msg?.type === 'SET_LIVERELOAD') {
    livereloadEnabled = msg.enabled;
    return false;
  }
  
  // Handle manual livereload toggle
  if (msg?.type === 'TOGGLE_LIVERELOAD') {
    const { tabId, action } = msg;
    const func = action === 'add' ? injectLivereload : removeLivereload;
    
    chrome.scripting.executeScript({
      target: { tabId },
      world: 'MAIN',
      func: func,
    })
    .then(() => {
      sendResponse({ success: true });
    })
    .catch(error => {
      sendResponse({ success: false, error: error.message });
    });
    
    return true;
  }
  
  // Handle script injection
  if (msg?.type === 'INJECT_SCRIPT') {
    const { tabId, args, funcName } = msg;
    
    const func = functionMap[funcName];
    
    if (!func) {
      sendResponse({ success: false, error: `Unknown function: ${funcName}` });
      return false;
    }
    
    chrome.scripting.executeScript({
      target: { tabId },
      world: 'MAIN',
      args: args || [],
      func: func,
    })
    .then(injectionResults => {
      sendResponse({
        success: true,
        data: injectionResults[0]?.result
      });
    })
    .catch(error => {
      sendResponse({
        success: false,
        error: error.message
      });
    });
    
    return true;
  }
  
  return false;
});