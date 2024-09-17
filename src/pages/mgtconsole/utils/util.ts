import { Dispatch } from 'redux'
import { HomeActions, IDefinitions } from '../../../store/home/types'
import { setDefinitions } from '../../../store/mgtconsole/actions'
import { MGTConsoleActions } from '../../../store/mgtconsole/types'
import { getExtensionDirectory } from '../../../utilities/utilities'
import { loadDefinitions } from '../components/utils'

export async function fetchDefinitions(dispatch: Dispatch<MGTConsoleActions | HomeActions>) {
  const directoryEntry = await getExtensionDirectory()
  const definitions: IDefinitions[] = await loadDefinitions(directoryEntry, ['@microsoft', 'react'])
  dispatch(setDefinitions(definitions))
  return
}
