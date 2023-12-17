import { CommandBarButton } from '@fluentui/react';
import { buttonStyles } from './QuickLinkButton';

function loadTeamsDebugScript() {
  let tabFrame = document.querySelector("iframe[name='embedded-page-container']") as HTMLIFrameElement | null;
  if (tabFrame) {
    tabFrame.src += '&debug=true&noredir=true&debugManifestsFile=https://localhost:4321/temp/manifests.js';
    return true;
  } else {
    return false;
  }
}

const LoadTeamsDebug = ({ tabId }: any) => {
  return (
    <CommandBarButton
      text={'Load debug manifest to Teams'}
      iconProps={{ iconName: 'Edit' }}
      styles={buttonStyles}
      onClick={() =>
        chrome.scripting
          .executeScript({
            target: { tabId: tabId },
            world: 'MAIN',
            args: [],
            func: loadTeamsDebugScript,
          })
          .then((injectionResults) => {
            console.log(injectionResults);
          })
      }
    />
  );
};

export default LoadTeamsDebug;
