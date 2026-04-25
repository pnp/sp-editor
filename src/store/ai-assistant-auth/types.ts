import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

export interface IUser {
  id?: number;
  email?: string;
  name?: string;
}

export interface IAiAssistantAuthState {
  isAuthenticated: boolean;
  apiKey: string | null;
  user: IUser | null;
  loading: boolean;
  error: string | null;
}

export enum Constants {
  AUTH_SET_STATE = 'AI_AUTH_SET_STATE',
  AUTH_SET_LOADING = 'AI_AUTH_SET_LOADING',
  AUTH_SET_ERROR = 'AI_AUTH_SET_ERROR',
  AUTH_LOGOUT = 'AI_AUTH_LOGOUT',
}

export type AiAssistantAuthActions = ActionType<typeof actions>;
