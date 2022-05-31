import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SettingsMyAccountState, SETTINGS_MY_ACCOUNT_STATE_FEATURE_KEY } from './settings-my-account.reducer';

export const selectSettingsMyAccountState = createFeatureSelector<SettingsMyAccountState>(SETTINGS_MY_ACCOUNT_STATE_FEATURE_KEY);

export const selectUser = createSelector(selectSettingsMyAccountState, (state) => state.data);
export const selectStatus = createSelector(selectSettingsMyAccountState, (state) => state.status);
export const selectError = createSelector(selectSettingsMyAccountState, (state) => state.error);

export const selectLocalizations = createSelector(selectSettingsMyAccountState, (state) => state.localizations);
