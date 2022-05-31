import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
    SettingsCategoryDefinitionsDetailsState,
    SETTINGS_CATEGORY_DEFINITIONS_DETAILS_STATE_FEATURE_KEY,
} from './settings-category-definitions-details.reducer';

export const selectSettingsCategoryDefinitionsDetailsState = createFeatureSelector<SettingsCategoryDefinitionsDetailsState>(
    SETTINGS_CATEGORY_DEFINITIONS_DETAILS_STATE_FEATURE_KEY
);

export const selectDefinition = createSelector(selectSettingsCategoryDefinitionsDetailsState, (state) => state.data);
export const selectStatus = createSelector(selectSettingsCategoryDefinitionsDetailsState, (state) => state.status);
export const selectError = createSelector(selectSettingsCategoryDefinitionsDetailsState, (state) => state.error);
export const selectDeleted = createSelector(selectSettingsCategoryDefinitionsDetailsState, (state) => state.deleted);
