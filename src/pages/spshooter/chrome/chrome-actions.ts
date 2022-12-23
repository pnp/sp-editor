import { Dispatch } from 'redux'
import * as rootActions from '../../../store/home/actions'
import { HomeActions, MessageBarColors } from '../../../store/home/types'
import * as actions from '../../../store/spshoot/actions'
import { ISPShootPayload, SPShootActions } from '../../../store/spshoot/types'
import { exescript } from '../../../utilities/chromecommon'
import { getPnpjsPath, getSystemjsPath } from '../../../utilities/utilities'
import { getContext } from './getContext'
import { shoot } from './shoot'

export async function runRestCall(dispatch: Dispatch<SPShootActions | HomeActions>, payload: ISPShootPayload) {

  dispatch(rootActions.setLoading(true));
  // add listener to receive the results from inspectedPage
  chrome.runtime.onMessage.addListener(function shootCallback(message: any) {

    if (
      typeof message !== 'object' ||
      message === null ||
      message === undefined ||
      message.source === undefined
    ) {
      return
    }

    switch (message.function) {
      case shoot.name:
        if (message.success) {
          /* on success */
          const res = message.result
          dispatch(actions.setResults(res))
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
          dispatch(actions.setResults(message.errorMessage))
        }
        // remove listener
        chrome.runtime.onMessage.removeListener(shootCallback)
        break
    }
  })

  // execute script in inspectedWindow
  let script = `${getPnpjsPath()} ${getSystemjsPath()} ${exescript} ${shoot}`
  script += ` ${exescript.name}(${shoot.name}, '${encodeURIComponent(JSON.stringify(payload)).replace(/'/g, '%27')}');`
  chrome.devtools.inspectedWindow.eval(script)
}

export async function getContextInfo(dispatch: Dispatch<SPShootActions | HomeActions>) {

  dispatch(rootActions.setLoading(true));
  // add listener to receive the results from inspectedPage
  chrome.runtime.onMessage.addListener(function getContextInfoCallback(message: any) {

    if (
      typeof message !== 'object' ||
      message === null ||
      message === undefined ||
      message.source === undefined
    ) {
      return
    }

    switch (message.function) {
      case getContext.name:
        if (message.success) {
          /* on success */
          const res = message.result
          dispatch(actions.setContext(JSON.parse(res)._spPageContextInfo))
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
          dispatch(actions.setContext(null))
        }
        // remove listener
        chrome.runtime.onMessage.removeListener(getContextInfoCallback)
        break
    }
  })

  // execute script in inspectedWindow
  let script = `${getPnpjsPath()} ${getSystemjsPath()} ${exescript} ${getContext}`
  script += ` ${exescript.name}(${getContext.name});`
  chrome.devtools.inspectedWindow.eval(script)
}
