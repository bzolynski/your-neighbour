import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
    SettingsCategoriesDetailsState as SettingsCategoriesDetailsState,
    SETTINGS_CATEGORIES_DETAILS_STATE_FEATURE_KEY,
} from './settings-categories-details.reducer';

export const selectSettingsCategoriesDetailsState = createFeatureSelector<SettingsCategoriesDetailsState>(
    SETTINGS_CATEGORIES_DETAILS_STATE_FEATURE_KEY
);

export const selectCategory = createSelector(selectSettingsCategoriesDetailsState, (state) => state.data);
export const selectStatus = createSelector(selectSettingsCategoriesDetailsState, (state) => state.status);
export const selectError = createSelector(selectSettingsCategoriesDetailsState, (state) => state.error);
