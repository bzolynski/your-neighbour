import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
    SettingsCategoryDefinitionsFormState,
    SETTINGS_CATEGORY_DEFINITIONS_FORM_STATE_FEATURE_KEY,
} from './settings-category-definitions-form.reducer';

export const selectSettingsCategoryDefinitionsFormState = createFeatureSelector<SettingsCategoryDefinitionsFormState>(
    SETTINGS_CATEGORY_DEFINITIONS_FORM_STATE_FEATURE_KEY
);

export const selectDefinition = createSelector(selectSettingsCategoryDefinitionsFormState, (state) => state.data);
export const selectStatus = createSelector(selectSettingsCategoryDefinitionsFormState, (state) => state.status);
export const selectError = createSelector(selectSettingsCategoryDefinitionsFormState, (state) => state.error);
