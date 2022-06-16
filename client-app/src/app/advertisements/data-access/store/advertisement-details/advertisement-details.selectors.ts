import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AdvertisementDetailsState, ADVERTISEMENT_DETAILS_FEATURE_KEY } from './advertisement-details.reducer';

export const advertisementDetailsState = createFeatureSelector<AdvertisementDetailsState>(ADVERTISEMENT_DETAILS_FEATURE_KEY);

export const selectAdvertisement = createSelector(advertisementDetailsState, (state) => state.data);
export const selectUser = createSelector(advertisementDetailsState, (state) => state.user);
export const selectIsFavorite = createSelector(advertisementDetailsState, (state) => state.favorite);
export const selectStatus = createSelector(advertisementDetailsState, (state) => state.status);
export const selectError = createSelector(advertisementDetailsState, (state) => state.error);
export const selectIsOwner = createSelector(advertisementDetailsState, (state) => state.isOwner);
