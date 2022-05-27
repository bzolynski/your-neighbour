import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SettingsCategoriesState, SETTINGS_CATEGORIES_STATE_FEATURE_KEY } from './settings-categories.reducer';

export const selectSettingsCategoriesState = createFeatureSelector<SettingsCategoriesState>(
    SETTINGS_CATEGORIES_STATE_FEATURE_KEY
);

export const selectCategories = createSelector(selectSettingsCategoriesState, (state) => state.data);
export const selectStatus = createSelector(selectSettingsCategoriesState, (state) => state.status);
export const selectError = createSelector(selectSettingsCategoriesState, (state) => state.error);
