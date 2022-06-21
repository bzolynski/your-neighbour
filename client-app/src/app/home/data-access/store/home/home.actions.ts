import { createAction, props } from '@ngrx/store';
import { Advertisement } from 'src/app/advertisements/data-access/models/advertisement.model';
import { IImage } from 'src/app/shared/data-access/models';

export const loadAdvertisements = createAction('[Home] Load Advertisements', props<{ quantity: number }>());
export const loadAdvertisementsSuccess = createAction(
    '[Home] Load Advertisements Success',
    props<{ advertisements: Advertisement[] }>()
);
export const loadAdvertisementsError = createAction('[Home] Load Advertisements Error', props<{ error: string }>());

export const loadImagesSuccess = createAction('[Home] Load Images Success', props<{ itemId: number; images: IImage[] }>());
export const loadImagesError = createAction('[Home] Load Images Error', props<{ error: string }>());
