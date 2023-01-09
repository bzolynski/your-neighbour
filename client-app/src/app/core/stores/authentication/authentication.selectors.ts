import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthenticationState, AUTHENTICATION_STATE_KEY } from './authentication.reducer';

export const selectAuthenticationState = createFeatureSelector<AuthenticationState>(AUTHENTICATION_STATE_KEY);

export const selectUser = createSelector(selectAuthenticationState, (state) => state.user);
export const selectError = createSelector(selectAuthenticationState, (state) => state.error);
