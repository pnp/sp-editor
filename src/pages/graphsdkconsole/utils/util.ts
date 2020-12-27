import { Dispatch } from 'redux'
import { setDefinitions } from '../../../store/graphsdkconsole/actions'
import { GraphSDKConsoleActions } from '../../../store/graphsdkconsole/types'
import { HomeActions, IDefinitions } from '../../../store/home/types'
import { getExtensionDirectory } from '../../../utilities/utilities'
import { loadDefinitions } from '../components/utils'

export async function fetchDefinitions(dispatch: Dispatch<GraphSDKConsoleActions | HomeActions>) {
  const directoryEntry = await getExtensionDirectory()
  const definitions: IDefinitions[] = await loadDefinitions(directoryEntry, ['@microsoft', 'msal'])
  dispatch(setDefinitions(definitions))
  return
}
