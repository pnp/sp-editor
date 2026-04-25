import { action } from 'typesafe-actions';
import { Constants, IUser } from './types';

export const setAuthState = (state: {
  isAuthenticated: boolean;
  apiKey: string | null;
  user: IUser | null;
}) => action(Constants.AUTH_SET_STATE, state);

export const setAuthLoading = (loading: boolean) =>
  action(Constants.AUTH_SET_LOADING, { loading });

export const setAuthError = (error: string | null) =>
  action(Constants.AUTH_SET_ERROR, { error });

export const logout = () => action(Constants.AUTH_LOGOUT);
