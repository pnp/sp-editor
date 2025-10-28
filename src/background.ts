import { getCustomActions } from './pages/scriptlinks/chrome/getscriptlinks';
import { createCustomAction } from './pages/scriptlinks/chrome/createscriptlink';
import { deleteCustomActions } from './pages/scriptlinks/chrome/deletescriptlinks';
import { updateCustomAction } from './pages/scriptlinks/chrome/updatescriptlink';
import { updateCacheCustomAction } from './pages/scriptlinks/chrome/updatescriptlinkcache';
import { addAndInstallApp } from './pages/scriptlinks/chrome/addandinstallapp';
import { unInstallAppFromWeb } from './pages/scriptlinks/chrome/uninstallappfromweb';

console.log('🚀 SP Editor background script loaded');

// Map of function names to actual functions
const functionMap: Record<string, (...args: any[]) => any> = {
  getCustomActions,
  createCustomAction,
  deleteCustomActions,
  updateCustomAction,
  updateCacheCustomAction,
  addAndInstallApp,
  unInstallAppFromWeb,
};

// Listen for injection requests from DevTools
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
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