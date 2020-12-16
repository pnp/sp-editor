import { Dispatch } from 'redux'
import { HomeActions } from '../../../store/home/types'
import { setDefinitions } from '../../../store/mgtconsole/actions'
import { IDefinitions, MGTConsoleActions } from '../../../store/mgtconsole/types'
import { getExtensionDirectory, loadDefinitions } from '../components/utils'

export async function fetchDefinitions(dispatch: Dispatch<MGTConsoleActions | HomeActions>) {
  const directoryEntry = await getExtensionDirectory()
  const definitions: IDefinitions[] = await loadDefinitions(directoryEntry, ['@microsoft', 'react', 'msal'])
  dispatch(setDefinitions(definitions))
  return
}
