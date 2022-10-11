import { createAction, props } from '@ngrx/store';
import { Advertisement } from '@core/models/';

export const loadAdvertisements = createAction('[SettingsAdvertisementsComponent] Load Advertisements');
export const loadAdvertisementsSuccess = createAction(
    '[SettingsAdvertisementsComponent] Load Advertisements Success',
    props<{ advertisements: Advertisement[] }>()
);
export const loadAdvertisementsError = createAction(
    '[SettingsAdvertisementsComponent] Load Advertisements Error',
    props<{ error: string }>()
);

export const deleteAdvertisement = createAction(
    '[SettingsAdvertisementsComponent] Delete Advertisement',
    props<{ id: number }>()
);
export const deleteAdvertisementSuccess = createAction(
    '[SettingsAdvertisementsComponent] Delete Advertisement Success',
    props<{ id: number }>()
);
export const deleteAdvertisementError = createAction(
    '[SettingsAdvertisementsComponent] Delete Advertisement Error',
    props<{ error: string }>()
);

export const addToList = createAction('[SettingsAdvertisementsComponent] Add To List', props<{ id: number }>());
export const addToListSuccess = createAction(
    '[SettingsAdvertisementsComponent] Add To List Success',
    props<{ advertisement: Advertisement }>()
);
export const addToListError = createAction('[SettingsAdvertisementsComponent] Add To List Error', props<{ error: string }>());

export const updateOnList = createAction('[SettingsAdvertisementsComponent] Update On List', props<{ id: number }>());
export const updateOnListSuccess = createAction(
    '[SettingsAdvertisementsComponent] Update On List Success',
    props<{ advertisement: Advertisement }>()
);
export const updateOnListError = createAction(
    '[SettingsAdvertisementsComponent] Update On List Error',
    props<{ error: string }>()
);
