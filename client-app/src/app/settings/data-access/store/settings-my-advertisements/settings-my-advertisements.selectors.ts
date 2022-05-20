import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
    SettingsMyAdvertisementsState,
    SETTINGS_MY_ADVERTISEMENTS_STATE_FEATURE_KEY,
} from './settings-my-advertisements.reducer';

export const selectSettingsMyAdvertisementsState = createFeatureSelector<SettingsMyAdvertisementsState>(
    SETTINGS_MY_ADVERTISEMENTS_STATE_FEATURE_KEY
);

export const selectAdvertisements = createSelector(selectSettingsMyAdvertisementsState, (state) => state.data);
export const selectStatus = createSelector(selectSettingsMyAdvertisementsState, (state) => state.status);
export const selectError = createSelector(selectSettingsMyAdvertisementsState, (state) => state.error);

export const selectListViewType = createSelector(selectSettingsMyAdvertisementsState, (state) => state.listViewType);
