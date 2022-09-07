import { createAction, props } from '@ngrx/store';
import { AdvertisementImage, Advertisement } from '@models/';

export const loadAdvertisements = createAction('[SettingsMyAdvertisementsComponent] Load Advertisements');
export const loadAdvertisementsSuccess = createAction(
    '[SettingsMyAdvertisementsComponent] Load Advertisements Success',
    props<{ advertisements: Advertisement[] }>()
);
export const loadAdvertisementsError = createAction(
    '[SettingsMyAdvertisementsComponent] Load Advertisements Error',
    props<{ error: string }>()
);

export const deleteAdvertisement = createAction(
    '[SettingsMyAdvertisementsComponent] Delete Advertisement',
    props<{ id: number }>()
);
export const deleteAdvertisementSuccess = createAction(
    '[SettingsMyAdvertisementsComponent] Delete Advertisement Success',
    props<{ id: number }>()
);
export const deleteAdvertisementError = createAction(
    '[SettingsMyAdvertisementsComponent] Delete Advertisement Error',
    props<{ error: string }>()
);

export const loadImages = createAction('[SettingsMyAdvertisementsComponent] Load Images', props<{ advertisementId: number }>());
export const loadImagesSuccess = createAction(
    '[SettingsMyAdvertisementsComponent] Load Images Success',
    props<{ advertisementId: number; images: AdvertisementImage[] }>()
);
export const loadImagesError = createAction('[SettingsMyAdvertisementsComponent] Load Images Error', props<{ error: string }>());

// create
export const createAdvertisement = createAction(
    '[SettingsMyAdvertisementsComponent] Create Advertisement',
    props<{ advertisement: Advertisement }>()
);
export const createAdvertisementSuccess = createAction(
    '[SettingsMyAdvertisementsComponent] Create Advertisement Success',
    props<{ advertisement: Advertisement }>()
);
export const createAdvertisementError = createAction(
    '[SettingsMyAdvertisementsComponent] Create Advertisement Error',
    props<{ error: string }>()
);

// update
export const updateAdvertisement = createAction(
    '[SettingsMyAdvertisementsComponent] Update Advertisement',
    props<{ id: number; advertisement: Advertisement }>()
);
export const updateAdvertisementSuccess = createAction(
    '[SettingsMyAdvertisementsComponent] Update Advertisement Success',
    props<{ advertisement: Advertisement }>()
);
export const updateAdvertisementError = createAction(
    '[SettingsMyAdvertisementsComponent] Update Advertisement Error',
    props<{ error: string }>()
);
