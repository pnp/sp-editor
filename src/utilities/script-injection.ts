/**
 * Common script injection utility for Chrome DevTools extensions
 * Handles both Chromium (direct injection) and Firefox (via background script)
 */

// Detect browser capabilities
const isChromium = typeof chrome !== 'undefined' && typeof chrome.scripting !== 'undefined';

/**
 * Execute a script in the inspected window
 * @param funcName - Name of the function (used for Firefox background messaging)
 * @param func - The function to inject
 * @param args - Arguments to pass to the function
 * @returns Promise with the execution result
 */
export async function executeScript(funcName: string, func: Function, args: any[]): Promise<any> {
  const tabId = chrome.devtools?.inspectedWindow?.tabId;

  if (isChromium) {

    const injectionResults = await chrome.scripting.executeScript({
      target: { tabId },
      world: 'MAIN',
      args,
      func: func as any,
    });

    return injectionResults[0]?.result;
  } else {
    // Firefox: Use background script
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage(
        {
          type: 'INJECT_SCRIPT',
          tabId: tabId,
          funcName: funcName,
          args: args,
        },
        (response) => {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError);
            return;
          }
          
          if (response.success) {
            resolve(response.data);
          } else {
            reject(new Error(response.error || 'Unknown error'));
          }
        }
      );
    });
  }
}