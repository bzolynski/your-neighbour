import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SettingsMyAdvertisementsState, SETTINGS_ADVERTISEMENTS_STATE_FEATURE_KEY } from './settings-advertisements.reducer';

export const selectSettingsMyAdvertisementsState = createFeatureSelector<SettingsMyAdvertisementsState>(
    SETTINGS_ADVERTISEMENTS_STATE_FEATURE_KEY
);

export const selectAdvertisements = createSelector(selectSettingsMyAdvertisementsState, (state) => state.data);
export const selectStatus = createSelector(selectSettingsMyAdvertisementsState, (state) => state.status);
export const selectError = createSelector(selectSettingsMyAdvertisementsState, (state) => state.error);
