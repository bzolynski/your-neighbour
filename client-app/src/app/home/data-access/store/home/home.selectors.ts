import { createFeatureSelector, createSelector } from '@ngrx/store';
import { HomeState, HOME_FEATURE_KEY } from './home.reducer';

export const homeState = createFeatureSelector<HomeState>(HOME_FEATURE_KEY);

export const selectAdvertisements = createSelector(homeState, (state) => state.data);
export const selectStatus = createSelector(homeState, (state) => state.status);
export const selectError = createSelector(homeState, (state) => state.error);
