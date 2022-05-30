import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
    SettingsCategoryDefinitionsState,
    SETTINGS_CATEGORY_DEFINITIONS_STATE_FEATURE_KEY,
} from './settings-category-definitions.reducer';

export const selectSettingsCategoryDefinitionsState = createFeatureSelector<SettingsCategoryDefinitionsState>(
    SETTINGS_CATEGORY_DEFINITIONS_STATE_FEATURE_KEY
);

export const selectDefinitions = createSelector(selectSettingsCategoryDefinitionsState, (state) => state.data);
export const selectStatus = createSelector(selectSettingsCategoryDefinitionsState, (state) => state.status);
export const selectError = createSelector(selectSettingsCategoryDefinitionsState, (state) => state.error);
