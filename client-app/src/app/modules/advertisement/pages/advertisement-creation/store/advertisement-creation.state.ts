import { advertisementItemDetailsReducer as itemDetailsReducer } from './item-details/item-details.reducer';
import { ItemDetailsState, ITEM_DETAILS_STATE_NAME } from './item-details/item-details.state';
import { itemImagesReducer } from './item-images/item-images.reducer';
import { ItemImagesState, ITEM_IMAGES_STATE_NAME } from './item-images/item-images.state';

export const ADVERTISEMENT_CREATION_STATE_NAME = 'creation';

export interface AdvertisementCreationState {
    [ITEM_DETAILS_STATE_NAME]: ItemDetailsState;
    [ITEM_IMAGES_STATE_NAME]: ItemImagesState;
}

export const advertisementCreationReducer = {
    [ITEM_DETAILS_STATE_NAME]: itemDetailsReducer,
    [ITEM_IMAGES_STATE_NAME]: itemImagesReducer,
};
