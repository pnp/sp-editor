/**
 * Chrome Storage Service for AI Assistant Auth
 * Handles persisting API key to Chrome's local storage (encrypted by browser)
 */

const API_KEY_STORAGE_KEY = 'ai_assistant_api_key';

/**
 * Save API key to Chrome storage
 */
export async function saveApiKey(apiKey: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof chrome === 'undefined' || !chrome.storage?.local) {
      reject(new Error('Chrome storage not available'));
      return;
    }
    chrome.storage.local.set({ [API_KEY_STORAGE_KEY]: apiKey }, () => {
      if (chrome.runtime.lastError) {
        reject(new Error(chrome.runtime.lastError.message));
      } else {
        resolve();
      }
    });
  });
}

/**
 * Load API key from Chrome storage
 */
export async function loadApiKey(): Promise<string | null> {
  return new Promise((resolve) => {
    if (typeof chrome === 'undefined' || !chrome.storage?.local) {
      resolve(null);
      return;
    }
    chrome.storage.local.get([API_KEY_STORAGE_KEY], (result) => {
      const key = result[API_KEY_STORAGE_KEY] || null;
      resolve(key);
    });
  });
}

/**
 * Clear API key from Chrome storage
 */
export async function clearApiKey(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof chrome === 'undefined' || !chrome.storage?.local) {
      reject(new Error('Chrome storage not available'));
      return;
    }
    chrome.storage.local.remove([API_KEY_STORAGE_KEY], () => {
      if (chrome.runtime.lastError) {
        reject(new Error(chrome.runtime.lastError.message));
      } else {
        resolve();
      }
    });
  });
}
