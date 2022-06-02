import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SettingsMyAccountFormState, SETTINGS_MY_ACCOUNT_FORM_STATE_FEATURE_KEY } from './settings-my-account-form.reducer';

export const selectSettingsMyAccountFormState = createFeatureSelector<SettingsMyAccountFormState>(
    SETTINGS_MY_ACCOUNT_FORM_STATE_FEATURE_KEY
);

export const selectUser = createSelector(selectSettingsMyAccountFormState, (state) => state.data);
export const selectStatus = createSelector(selectSettingsMyAccountFormState, (state) => state.status);
export const selectError = createSelector(selectSettingsMyAccountFormState, (state) => state.error);
