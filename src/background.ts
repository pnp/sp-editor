import { getCustomActions } from './pages/scriptlinks/chrome/getscriptlinks';
import { createCustomAction } from './pages/scriptlinks/chrome/createscriptlink';
import { deleteCustomActions } from './pages/scriptlinks/chrome/deletescriptlinks';
import { updateCustomAction } from './pages/scriptlinks/chrome/updatescriptlink';
import { updateCacheCustomAction } from './pages/scriptlinks/chrome/updatescriptlinkcache';
import { addAndInstallApp } from './pages/scriptlinks/chrome/addandinstallapp';
import { unInstallAppFromWeb } from './pages/scriptlinks/chrome/uninstallappfromweb';

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

// Map of function names to actual functions
const functionMap: Record<string, (...args: any[]) => any> = {
  getCustomActions,
  createCustomAction,
  deleteCustomActions,
  updateCustomAction,
  updateCacheCustomAction,
  addAndInstallApp,
  unInstallAppFromWeb,
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