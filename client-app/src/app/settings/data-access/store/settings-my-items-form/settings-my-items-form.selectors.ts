import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SettingsMyItemsFormState, SETTINGS_MY_ITEM_FORM_STATE_FEATURE_KEY } from './settings-my-items-form.reducer';

export const selectSettingsMyItemsFormState = createFeatureSelector<SettingsMyItemsFormState>(
    SETTINGS_MY_ITEM_FORM_STATE_FEATURE_KEY
);

export const selectOpen = createSelector(selectSettingsMyItemsFormState, (state) => state.open);
export const selectItem = createSelector(selectSettingsMyItemsFormState, (state) => state.data);
export const selectItemStatus = createSelector(selectSettingsMyItemsFormState, (state) => state.status);
export const selectItemError = createSelector(selectSettingsMyItemsFormState, (state) => state.error);
export const selectCategories = createSelector(selectSettingsMyItemsFormState, (state) => state.categories);
