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

export const redirectToChat = createAction('[SettingsMyAccountComponent] Redirect To Chat', props<{ ownerId: number }>());
export const redirectToChatSuccess = createAction('[SettingsMyAccountComponent] Redirect To Chat Success');
export const redirectToChatError = createAction(
    '[SettingsMyAccountComponent] Redirect To Chat Error',
    props<{ error: string }>()
);

export const loadUser = createAction('[SettingsMyAccountComponent] Load User', props<{ id: number }>());
export const loadUserSuccess = createAction('[SettingsMyAccountComponent] Load User Success', props<{ user: IUser }>());
export const loadUserError = createAction('[SettingsMyAccountComponent] Load User Error', props<{ error: string }>());

export const addFavorite = createAction('[SettingsMyAccountComponent] Add Favorite', props<{ advertisementId: number }>());
export const addFavoriteSuccess = createAction('[SettingsMyAccountComponent] Add Favorite Success');
export const addFavoriteError = createAction('[SettingsMyAccountComponent] Add Favorite Error', props<{ error: string }>());

export const deleteFavorite = createAction('[SettingsMyAccountComponent] Delete Favorite', props<{ advertisementId: number }>());
export const deleteFavoriteSuccess = createAction('[SettingsMyAccountComponent] Delete Favorite Success');
export const deleteFavoriteError = createAction('[SettingsMyAccountComponent] Delete Favorite Error', props<{ error: string }>());

export const setIsOwner = createAction('[AdvertisementDetailsComponent] Set Is Owner', props<{ isOwner: boolean }>());

export const resetState = createAction('[AdvertisementDetailsComponent] Reset State');
