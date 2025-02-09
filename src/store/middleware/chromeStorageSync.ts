import { Middleware } from 'redux';
import { IRootState } from '../index';

const chromeStorageSync: Middleware<{}, IRootState> = store => next => action => {
  const result = next(action);
  const state = store.getState();

  // Sync the state with Chrome storage
  chrome.storage.local.set({ state }, () => {
    console.log('State saved to Chrome storage');
  });

  return result;
};

export default chromeStorageSync;