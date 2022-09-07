import { createAction, props } from '@ngrx/store';
import { Advertisement, AdvertisementImage } from '@models/';

export const loadAdvertisements = createAction('[Home] Load Advertisements', props<{ quantity: number }>());
export const loadAdvertisementsSuccess = createAction(
    '[Home] Load Advertisements Success',
    props<{ advertisements: Advertisement[] }>()
);
export const loadAdvertisementsError = createAction('[Home] Load Advertisements Error', props<{ error: string }>());

export const loadImagesSuccess = createAction(
    '[Home] Load Images Success',
    props<{ advertisementId: number; images: AdvertisementImage[] }>()
);
export const loadImagesError = createAction('[Home] Load Images Error', props<{ error: string }>());
