import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SettingsCategoriesFormState, SETTINGS_CATEGORIES_FORM_STATE_FEATURE_KEY } from './settings-categories-form.reducer';

export const selectSettingsCategoriesFormState = createFeatureSelector<SettingsCategoriesFormState>(
    SETTINGS_CATEGORIES_FORM_STATE_FEATURE_KEY
);

export const selectCategory = createSelector(selectSettingsCategoriesFormState, (state) => state.data);
export const selectStatus = createSelector(selectSettingsCategoriesFormState, (state) => state.status);
export const selectError = createSelector(selectSettingsCategoriesFormState, (state) => state.error);
export const selectDefinitions = createSelector(selectSettingsCategoriesFormState, (state) => state.definitions);
