import { Dispatch } from 'redux'
import { HomeActions } from '../../../store/home/types'
import { setDefinitions } from '../../../store/graphsdkconsole/actions'
import { IDefinitions, GraphSDKConsoleActions } from '../../../store/graphsdkconsole/types'
import { getExtensionDirectory, loadDefinitions } from '../components/utils'

export async function fetchDefinitions(dispatch: Dispatch<GraphSDKConsoleActions | HomeActions>) {
  const directoryEntry = await getExtensionDirectory()
  const definitions: IDefinitions[] = await loadDefinitions(directoryEntry, ['@microsoft', 'msal'])
  dispatch(setDefinitions(definitions))
  return
}
