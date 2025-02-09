import { IRootState } from './index';

export const loadInitialState = (): Promise<IRootState> => {
  return new Promise((resolve) => {
    chrome.storage.local.get('state', (result) => {
      if (result.state) {
        resolve(result.state);
      } else {
        resolve({} as IRootState);
      }
    });
  });
};
