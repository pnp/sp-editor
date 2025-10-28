import { getCustomActions } from './pages/scriptlinks/chrome/getscriptlinks';
import { createCustomAction } from './pages/scriptlinks/chrome/createscriptlink';
import { deleteCustomActions } from './pages/scriptlinks/chrome/deletescriptlinks';
import { updateCustomAction } from './pages/scriptlinks/chrome/updatescriptlink';
import { updateCacheCustomAction } from './pages/scriptlinks/chrome/updatescriptlinkcache';
import { addAndInstallApp } from './pages/scriptlinks/chrome/addandinstallapp';
import { unInstallAppFromWeb } from './pages/scriptlinks/chrome/uninstallappfromweb';

console.log('🚀 SP Editor background script loaded');

// Define proper type for injected functions
type InjectedFunction = (...args: any[]) => any;

// Map of function names to actual functions
const functionMap: Record<string, InjectedFunction> = {
  getCustomActions: getCustomActions as InjectedFunction,
  createCustomAction: createCustomAction as InjectedFunction,
  deleteCustomActions: deleteCustomActions as InjectedFunction,
  updateCustomAction: updateCustomAction as InjectedFunction,
  updateCacheCustomAction: updateCacheCustomAction as InjectedFunction,
  addAndInstallApp: addAndInstallApp as InjectedFunction,
  unInstallAppFromWeb: unInstallAppFromWeb as InjectedFunction,
};

// Detect browser capabilities
const isChromium = typeof chrome !== 'undefined' && typeof chrome.scripting !== 'undefined';
const isFirefox = typeof chrome !== 'undefined' && typeof chrome.scripting === 'undefined';

console.log('Browser detection:', { isChromium, isFirefox });

// Listen for injection requests from DevTools (MV3 API - works in both browsers)
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  console.log('📨 Background received message:', msg.type);
  
  if (msg?.type === 'INJECT_SCRIPT') {
    const { tabId, args, funcName } = msg;
    
    console.log('💉 Injecting script into tab:', tabId, 'Function:', funcName);
    
    const func = functionMap[funcName];
    
    if (!func) {
      console.error('❌ Unknown function:', funcName);
      sendResponse({
        success: false,
        error: `Unknown function: ${funcName}`
      });
      return false;
    }
    
    if (isChromium) {
      // Chromium path - use chrome.scripting (MV3)
      console.log('Using chrome.scripting API (Chromium MV3)');
      chrome.scripting.executeScript({
        target: { tabId },
        world: 'MAIN',
        args: args || [],
        func: func,
      })
      .then(injectionResults => {
        console.log('✅ Injection successful:', injectionResults);
        sendResponse({
          success: true,
          data: injectionResults[0]?.result
        });
      })
      .catch(error => {
        console.error('❌ Injection failed:', error);
        sendResponse({
          success: false,
          error: error.message
        });
      });
      
      return true;
    } else {
      // Firefox MV3 path - chrome.scripting not available, must use scripting.executeScript without world parameter
      console.log('Using chrome.scripting API (Firefox MV3 - limited support)');
      
      try {
        // Firefox MV3 has chrome.scripting but not all features
        // We need to check if it exists first
        if (typeof chrome.scripting !== 'undefined' && chrome.scripting.executeScript) {
          // Try Firefox's limited MV3 scripting API
          chrome.scripting.executeScript({
            target: { tabId },
            // Note: 'world' parameter not supported in Firefox yet
            args: args || [],
            func: func,
          })
          .then(injectionResults => {
            console.log('✅ Injection successful (Firefox MV3):', injectionResults);
            sendResponse({
              success: true,
              data: injectionResults[0]?.result
            });
          })
          .catch(error => {
            console.error('❌ Injection failed (Firefox MV3):', error);
            sendResponse({
              success: false,
              error: error.message
            });
          });
        } else {
          // Fallback: Use content script injection for Firefox
          console.log('Fallback: Injecting via content script');
          
          const argValues = (args || []).map((arg: any) => JSON.stringify(arg)).join(',');
          const code = `
            (async function() {
              console.log('🎯 Firefox: Starting injection execution');
              try {
                const result = await (${func.toString()})(${argValues});
                console.log('🎯 Firefox: Function returned:', result);
                return result;
              } catch (error) {
                console.error('🎯 Firefox: Function execution error:', error);
                return { 
                  success: false, 
                  errorMessage: error.message || String(error),
                  source: 'injection-error'
                };
              }
            })();
          `;
          
          // Use MV3 scripting API with code string instead of func
          chrome.scripting.executeScript({
            target: { tabId },
            func: new Function('return ' + code)() as any,
          })
          .then(injectionResults => {
            console.log('✅ Injection successful:', injectionResults);
            sendResponse({
              success: true,
              data: injectionResults[0]?.result
            });
          })
          .catch(error => {
            console.error('❌ Injection failed:', error);
            sendResponse({
              success: false,
              error: error.message
            });
          });
        }
      } catch (error: any) {
        console.error('❌ Firefox injection failed:', error);
        sendResponse({
          success: false,
          error: error.message || 'Injection failed'
        });
      }
      
      return true;
    }
  }
  
  return false;
});

// No need for keepalive in MV3 - background scripts persist differently
console.log('✅ Background script ready');