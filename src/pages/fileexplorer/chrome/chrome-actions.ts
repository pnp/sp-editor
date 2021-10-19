import { Dispatch } from 'redux'
import * as actions from '../../../store/fileexplorer/actions'
import { FileExplorerActions, IFile } from '../../../store/fileexplorer/types'
import * as rootActions from '../../../store/home/actions'
import { HomeActions, MessageBarColors } from '../../../store/home/types'
import { exescript } from '../../../utilities/chromecommon'
import { getPnpjsPath, getSystemjsPath, spDelay } from '../../../utilities/utilities'
import { getFiles } from './getfiles'

export async function gertAllFiles(dispatch: Dispatch<FileExplorerActions | HomeActions>) {

  dispatch(rootActions.setLoading(true));
  // add listener to receive the results from inspectedPage
  (window as any).port.onMessage.addListener(function grtAllFilesCallback(message: any) {

    if (
      typeof message !== 'object' ||
      message === null ||
      message === undefined ||
      message.source === undefined
    ) {
      return
    }

    switch (message.function) {
      case getFiles.name:
        if (message.success) {
          /* on success */

          // add scriptlinks to state
          dispatch(actions.setAllFiles(message.result))
          // hide loading component
          dispatch(rootActions.setLoading(false))
        } else {
          /* on error */
          // hide loading component
          dispatch(rootActions.setLoading(false))
          // show error message
          dispatch(rootActions.setAppMessage({
            showMessage: true,
            message: message.errorMessage,
            color: MessageBarColors.danger,
          }))
        }
        // remove listener
        (window as any).port.onMessage.removeListener(grtAllFilesCallback)
        break
    }
  })

  // execute script in inspectedWindow
  let script = `${getPnpjsPath()} ${getSystemjsPath()} ${exescript} ${getFiles}`
  script += ` ${exescript.name}(${getFiles.name});`
  chrome.devtools.inspectedWindow.eval(script)
}
