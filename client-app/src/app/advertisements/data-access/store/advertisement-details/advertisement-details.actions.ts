import { createAction, props } from '@ngrx/store';
import { IImage, IUser } from 'src/app/shared/data-access/models';
import { Advertisement } from '../../models/advertisement.model';
export const loadAdvertisement = createAction('[AdvertisementDetailsComponent] Load Advertisement', props<{ id: number }>());
export const loadAdvertisementSuccess = createAction(
    '[AdvertisementDetailsComponent] Load Advertisement Success',
    props<{ advertisement: Advertisement }>()
);
export const loadAdvertisementError = createAction(
    '[AdvertisementDetailsComponent] Load Advertisement Error',
    props<{ error: string }>()
);

export const loadImages = createAction('[SettingsMyAccountComponent] Load Images', props<{ itemId: number }>());
export const loadImagesSuccess = createAction('[SettingsMyAccountComponent] Load Images Success', props<{ images: IImage[] }>());
export const loadImagesError = createAction('[SettingsMyAccountComponent] Load Images Error', props<{ error: string }>());

export const loadUser = createAction('[SettingsMyAccountComponent] Load User', props<{ id: number }>());
export const loadUserSuccess = createAction('[SettingsMyAccountComponent] Load User Success', props<{ user: IUser }>());
export const loadUserError = createAction('[SettingsMyAccountComponent] Load User Error', props<{ error: string }>());
