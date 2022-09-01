import { createAction, props } from '@ngrx/store';
import { Advertisement, Image } from '@models/';

export const loadAdvertisements = createAction('[Home] Load Advertisements', props<{ quantity: number }>());
export const loadAdvertisementsSuccess = createAction(
    '[Home] Load Advertisements Success',
    props<{ advertisements: Advertisement[] }>()
);
export const loadAdvertisementsError = createAction('[Home] Load Advertisements Error', props<{ error: string }>());

export const loadImagesSuccess = createAction('[Home] Load Images Success', props<{ itemId: number; images: Image[] }>());
export const loadImagesError = createAction('[Home] Load Images Error', props<{ error: string }>());
