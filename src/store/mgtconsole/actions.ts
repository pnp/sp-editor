import { action } from 'typesafe-actions'
import { IDefinitions } from '../home/types'
import { Constants } from './types'

export function setCode(code: string) {
  return action(Constants.MGT_SET_CODE, {
    code,
  })
}

export function setTranspiled(transpiled: string) {
  return action(Constants.MGT_SET_TRANSPILED, {
    transpiled,
  })
}

export function setResult(result: string) {
  return action(Constants.MGT_SET_RESULT, {
    result,
  })
}

export function setDefinitions(definitions: IDefinitions[]) {
  return action(Constants.MGT_SET_DEFINITIONS, {
    definitions,
  })
}
