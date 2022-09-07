import { createAction, props } from '@ngrx/store';
import { AdvertisementImage, Advertisement, AdvertisementDefinition, Localization } from '@models/';

// load advertisement
export const loadAdvertisement = createAction(
    '[SettingsMyAdvertisementsFormComponent] Load Advertisement',
    props<{ id: number }>()
);
export const loadAdvertisementSuccess = createAction(
    '[SettingsMyAdvertisementsFormComponent] Load Advertisement Success',
    props<{ advertisement: Advertisement }>()
);
export const loadAdvertisementError = createAction(
    '[SettingsMyAdvertisementsFormComponent] Load Advertisement Error',
    props<{ error: string }>()
);
// load images
export const loadImages = createAction('[SettingsMyAdvertisementsFormComponent] Load Images');
export const loadImagesSuccess = createAction(
    '[SettingsMyAdvertisementsFormComponent] Load Images Success',
    props<{ images: AdvertisementImage[] }>()
);
export const loadImagesError = createAction(
    '[SettingsMyAdvertisementsFormComponent] Load Images Error',
    props<{ error: string }>()
);

// load localizations
export const loadLocalizations = createAction('[SettingsMyAdvertisementsFormComponent] Load Localizations');
export const loadLocalizationsSuccess = createAction(
    '[SettingsMyAdvertisementsFormComponent] Load Localizations Success',
    props<{ localizations: Localization[] }>()
);
export const loadLocalizationsError = createAction(
    '[SettingsMyAdvertisementsFormComponent] Load Localizations Error',
    props<{ error: string }>()
);

// load definitions
export const loadDefinitions = createAction('[SettingsMyAdvertisementsFormComponent] Load Definitions');
export const loadDefinitionsSuccess = createAction(
    '[SettingsMyAdvertisementsFormComponent] Load Definitions Success',
    props<{ definitions: AdvertisementDefinition[] }>()
);
export const loadDefinitionsError = createAction(
    '[SettingsMyAdvertisementsFormComponent] Load Definitions Error',
    props<{ error: string }>()
);

// create
export const createAdvertisement = createAction(
    '[SettingsMyAdvertisementsFormComponent] Create Advertisement',
    props<{ advertisement: Advertisement }>()
);
export const createAdvertisementSuccess = createAction(
    '[SettingsMyAdvertisementsFormComponent] Create Advertisement Success',
    props<{ advertisement: Advertisement }>()
);
export const createAdvertisementError = createAction(
    '[SettingsMyAdvertisementsFormComponent] Create Advertisement Error',
    props<{ error: string }>()
);

// update
export const updateAdvertisement = createAction(
    '[SettingsMyAdvertisementsFormComponent] Update Advertisement',
    props<{ id: number; advertisement: Advertisement }>()
);
export const updateAdvertisementSuccess = createAction(
    '[SettingsMyAdvertisementsFormComponent] Update Advertisement Success',
    props<{ advertisement: Advertisement }>()
);
export const updateAdvertisementError = createAction(
    '[SettingsMyAdvertisementsFormComponent] Update Advertisement Error',
    props<{ error: string }>()
);
// export const setSubmited = createAction('[SettingsMyAdvertisementsFormComponent] Set Submited');
export const resetState = createAction('[SettingsMyAdvertisementsFormComponent] Reset State');
