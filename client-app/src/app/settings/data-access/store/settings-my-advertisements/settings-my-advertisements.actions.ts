import { createAction, props } from '@ngrx/store';
import { Image, Advertisement } from '@models/';

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

export const loadImages = createAction('[SettingsMyAdvertisementsComponent] Load Images', props<{ itemId: number }>());
export const loadImagesSuccess = createAction(
    '[SettingsMyAdvertisementsComponent] Load Images Success',
    props<{ itemId: number; images: Image[] }>()
);
export const loadImagesError = createAction('[SettingsMyAdvertisementsComponent] Load Images Error', props<{ error: string }>());
