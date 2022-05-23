import { createAction, props } from '@ngrx/store';
import { Advertisement } from 'src/app/advertisements/data-access/models/advertisement.model';
import { AdvertisementDefinition, IImage, IItem, Localization } from 'src/app/shared/data-access/models';

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
// load item
export const loadItem = createAction('[SettingsMyAdvertisementsFormComponent] Load Item', props<{ id: number }>());
export const loadItemSuccess = createAction(
    '[SettingsMyAdvertisementsFormComponent] Load Item Success',
    props<{ item: IItem }>()
);
export const loadItemError = createAction('[SettingsMyAdvertisementsFormComponent] Load Item Error', props<{ error: string }>());

// load items
export const loadItems = createAction('[SettingsMyAdvertisementsFormComponent] Load Items');
export const loadItemsSuccess = createAction(
    '[SettingsMyAdvertisementsFormComponent] Load Items Success',
    props<{ items: IItem[] }>()
);
export const loadItemsError = createAction(
    '[SettingsMyAdvertisementsFormComponent] Load Items Error',
    props<{ error: string }>()
);
// load images
export const loadImages = createAction('[SettingsMyAdvertisementsFormComponent] Load Images');
export const loadImagesSuccess = createAction(
    '[SettingsMyAdvertisementsFormComponent] Load Images Success',
    props<{ images: IImage[] }>()
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
export const updateItem = createAction(
    '[SettingsMyAdvertisementsFormComponent] Update Advertisement',
    props<{ id: number; advertisement: Advertisement }>()
);
export const updateItemSuccess = createAction(
    '[SettingsMyAdvertisementsFormComponent] Update Advertisement Success',
    props<{ advertisement: Advertisement }>()
);
export const updateItemError = createAction(
    '[SettingsMyAdvertisementsFormComponent] Update Advertisement Error',
    props<{ error: string }>()
);
