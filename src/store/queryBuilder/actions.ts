import { action } from 'typesafe-actions'
import { Constants } from './types'
import { IQueryField } from 'mgwdev-m365-helpers'


export function setContext(context: any) {
  return action(Constants.QB_SET_CONTEXT, {
    context,
  })
}

export function setLists(lists: []){
    return action(Constants.QB_SET_LISTS,{
        allLists: lists
    })
}
export function setSelectedList(list: string){
    return action(Constants.QB_SET_SELECTED_LIST,{
        selectedListId: list
    })
}
export function setListFields(listFields: []){
    return action(Constants.QB_SET_LIST_FIELDS,{
        listFields: listFields
    })
}
export function setConfiguredQueryFields(queryFields: IQueryField[]){
    return action(Constants.QB_SET_CONFIGURED_QUERY_FIELDS,{
        configuredQueryFields: queryFields
    })
}
export const setQuery = (query: string) => action(Constants.QB_SET_QUERY, query);
export const setCamlQuery = (camlQuery: string) => action(Constants.QB_SET_CAML_QUERY, camlQuery);
export const setSelectedViewFields = (fields: string[]) => action(Constants.QB_SET_SELECTED_VIEW_FIELDS, fields);
