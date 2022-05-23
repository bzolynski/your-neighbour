import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
    SettingsMyAdvertisementsFormState,
    SETTINGS_MY_ADVERTISEMENTS_FORM_STATE_FEATURE_KEY,
} from './settings-my-advertisements-form.reducer';

export const selectSettingsMyAdvertisementsFormState = createFeatureSelector<SettingsMyAdvertisementsFormState>(
    SETTINGS_MY_ADVERTISEMENTS_FORM_STATE_FEATURE_KEY
);

export const selectAdvertisement = createSelector(selectSettingsMyAdvertisementsFormState, (state) => state.data);
export const selectAdvertisementStatus = createSelector(selectSettingsMyAdvertisementsFormState, (state) => state.status);
export const selectAdvertisementError = createSelector(selectSettingsMyAdvertisementsFormState, (state) => state.error);
export const selectItems = createSelector(selectSettingsMyAdvertisementsFormState, (state) => state.items);
export const selectLocalizations = createSelector(selectSettingsMyAdvertisementsFormState, (state) => state.localizations);
export const selectDefinitions = createSelector(selectSettingsMyAdvertisementsFormState, (state) => state.definitions);
export const selectStatus = createSelector(selectSettingsMyAdvertisementsFormState, (state) => state.status);
export const selectError = createSelector(selectSettingsMyAdvertisementsFormState, (state) => state.error);
