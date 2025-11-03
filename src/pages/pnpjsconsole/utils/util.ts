import { Dispatch } from 'redux'
import { HomeActions, IDefinitions } from '../../../store/home/types'
import { setDefinitions } from '../../../store/pnpjsconsole/actions'
import { PnPjsConsoleActions } from '../../../store/pnpjsconsole/types'
import { getExtensionDirectory } from '../../../utilities/utilities'
import { loadDefinitions } from '../../../utilities/definitions-loader'

export async function fetchDefinitions(dispatch: Dispatch<PnPjsConsoleActions | HomeActions>) {
  const directoryEntry = await getExtensionDirectory()
  const definitions: IDefinitions[] = await loadDefinitions(directoryEntry, ['@pnp', '@microsoft'])
  dispatch(setDefinitions(definitions))
  return
}
