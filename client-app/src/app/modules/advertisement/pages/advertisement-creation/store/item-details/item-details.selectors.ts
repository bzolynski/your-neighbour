import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AdvertisementCreationState, ADVERTISEMENT_CREATION_STATE_NAME } from '../advertisement-creation.state';

const getAdvertisementCreationState = createFeatureSelector<AdvertisementCreationState>(ADVERTISEMENT_CREATION_STATE_NAME);

export const selectItemDetails = createSelector(getAdvertisementCreationState, (state) => state.itemDetails.itemDetails);
export const selectItemDetailsIsBusy = createSelector(getAdvertisementCreationState, (state) => state.itemDetails.isBusy);
export const selectItemDetailsError = createSelector(getAdvertisementCreationState, (state) => state.itemDetails.error);
