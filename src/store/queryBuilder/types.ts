import { IQueryField } from "mgwdev-m365-helpers"
import { ActionType } from "typesafe-actions";
import * as actions from "./actions";

export type QueryBuilderActions  = ActionType<typeof actions>

export interface IQueryBuilderState {
    context: any;
    allLists: { Title: string, Id: string }[];
    selectedListId?: string;
    listFields: { InternalName: string, Title: string, TypeAsString: string, LookupField?: string }[];
    configuredQueryFields: IQueryField[]
}

export enum Constants {
    QB_SET_CONTEXT = 'QB_SET_CONTEXT',
    QB_SET_LISTS = 'QB_SET_LISTS',
    QB_SET_SELECTED_LIST = 'QB_SET_SELECTED_LIST',
    QB_SET_LIST_FIELDS = 'QB_SET_LIST_FIELDS',
    QB_SET_CONFIGURED_QUERY_FIELDS = 'QB_SET_CONFIGURED_QUERY_FIELDS'
}