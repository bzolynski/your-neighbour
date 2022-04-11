import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthenticationState, AUTHENTICATION_STATE_NAME } from './authentication.state';

const getAuthenticationState = createFeatureSelector<AuthenticationState>(AUTHENTICATION_STATE_NAME);

export const selectUser = createSelector(getAuthenticationState, (state) => state.user);
export const selectAuthenticationStatus = createSelector(getAuthenticationState, (state) => state.status);
export const selectAuthenticationError = createSelector(getAuthenticationState, (state) => state.error);
