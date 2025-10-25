import { Constants, IQueryBuilderState, QueryBuilderActions } from './types'

const init: IQueryBuilderState = {
  context: null,
  listFields: [],
  allLists: [],
  configuredQueryFields: [],
  selectedListId: undefined,
  query: '',
  camlQuery: '',
  selectedViewFields: []
}

export function queryBuilderReducer(state: IQueryBuilderState = init, action: QueryBuilderActions): IQueryBuilderState {
  switch (action.type) {
    case Constants.QB_SET_CONTEXT:
      return { ...state, ...action.payload }
    case Constants.QB_SET_LISTS:
      return { ...state, ...action.payload }
    case Constants.QB_SET_CONFIGURED_QUERY_FIELDS:
      return { ...state, ...action.payload }
    case Constants.QB_SET_SELECTED_LIST:
      return { ...state, ...action.payload }
    case Constants.QB_SET_LIST_FIELDS:
      return { ...state, ...action.payload }
    case Constants.QB_SET_QUERY:
      return { ...state, query: action.payload };
    case Constants.QB_SET_CAML_QUERY:
      return { ...state, camlQuery: action.payload };
    case Constants.QB_SET_SELECTED_VIEW_FIELDS:
      return { ...state, selectedViewFields: action.payload };
    default:
      return state
  }
}
