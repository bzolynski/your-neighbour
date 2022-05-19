import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SettingsMyItemsState, SETTINGS_MY_ITEM_STATE_FEATURE_KEY } from './settings-my-items.reducer';

export const selectSettingsMyItemsState = createFeatureSelector<SettingsMyItemsState>(SETTINGS_MY_ITEM_STATE_FEATURE_KEY);

export const selectItems = createSelector(selectSettingsMyItemsState, (state) => state.data);
export const selectStatus = createSelector(selectSettingsMyItemsState, (state) => state.status);
export const selectError = createSelector(selectSettingsMyItemsState, (state) => state.error);

export const selectListViewType = createSelector(selectSettingsMyItemsState, (state) => state.listViewType);
