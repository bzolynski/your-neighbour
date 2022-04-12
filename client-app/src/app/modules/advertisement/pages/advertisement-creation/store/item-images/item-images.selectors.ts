import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AdvertisementCreationState, ADVERTISEMENT_CREATION_STATE_NAME } from '../advertisement-creation.state';

const getAdvertisementCreationState = createFeatureSelector<AdvertisementCreationState>(ADVERTISEMENT_CREATION_STATE_NAME);

export const selectItemImages = createSelector(getAdvertisementCreationState, (state) => state.itemImages.images);
export const selectItemImagesIsBusy = createSelector(getAdvertisementCreationState, (state) => state.itemImages.isBusy);
export const selectItemImagesError = createSelector(getAdvertisementCreationState, (state) => state.itemImages.error);
