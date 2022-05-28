import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
    SettingsCategoriesConnectState,
    SETTINGS_CATEGORIES_CONNECT_STATE_FEATURE_KEY,
} from './settings-categories-connect.reducer';

export const selectSettingsCategoriesConnectState = createFeatureSelector<SettingsCategoriesConnectState>(
    SETTINGS_CATEGORIES_CONNECT_STATE_FEATURE_KEY
);

export const selectTree = createSelector(selectSettingsCategoriesConnectState, (state) => state.data);
export const selectStatus = createSelector(selectSettingsCategoriesConnectState, (state) => state.status);
export const selectError = createSelector(selectSettingsCategoriesConnectState, (state) => state.error);
export const selectUnasignedCategories = createSelector(
    selectSettingsCategoriesConnectState,
    (state) => state.unasignedCategories
);
export const selectChanges = createSelector(selectSettingsCategoriesConnectState, (state) => state.changes);
