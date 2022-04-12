import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthenticationState, AUTHENTICATION_STATE_NAME } from './authentication.state';

const getAuthenticationState = createFeatureSelector<AuthenticationState>(AUTHENTICATION_STATE_NAME);

export const selectUser = createSelector(getAuthenticationState, (state) => state.user);
export const selectAuthenticationIsBusy = createSelector(getAuthenticationState, (state) => state.isBusy);
export const selectAuthenticationError = createSelector(getAuthenticationState, (state) => state.error);
