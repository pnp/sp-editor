import { IQueryField as IBaseQueryField } from "mgwdev-m365-helpers"
import { ActionType } from "typesafe-actions";
import * as actions from "./actions";

export type QueryBuilderActions  = ActionType<typeof actions>

export type LogicalOperator = "And" | "Or";

// Extend the library's IQueryField to add the operator property
export interface IQueryField extends IBaseQueryField {
    operator?: LogicalOperator;
}

export interface IQueryBuilderState {
    context: any;
    allLists: { Title: string, Id: string }[];
    selectedListId?: string;
    listFields: { InternalName: string, Title: string, TypeAsString: string, LookupField?: string }[];
    configuredQueryFields: IQueryField[];
    selectedViewFields: string[]; // Add this line
    query: string;
    camlQuery: string;
}

export enum Constants {
    QB_SET_CONTEXT = 'QB_SET_CONTEXT',
    QB_SET_LISTS = 'QB_SET_LISTS',
    QB_SET_SELECTED_LIST = 'QB_SET_SELECTED_LIST',
    QB_SET_LIST_FIELDS = 'QB_SET_LIST_FIELDS',
    QB_SET_CONFIGURED_QUERY_FIELDS = 'QB_SET_CONFIGURED_QUERY_FIELDS',
    QB_SET_SELECTED_VIEW_FIELDS = 'QB_SET_SELECTED_VIEW_FIELDS', // Add this
    QB_SET_QUERY = 'QB_SET_QUERY',
    QB_SET_CAML_QUERY = 'QB_SET_CAML_QUERY'
}