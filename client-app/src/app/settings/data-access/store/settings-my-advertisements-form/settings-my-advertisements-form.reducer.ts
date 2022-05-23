import { createReducer, on } from '@ngrx/store';
import { Advertisement } from 'src/app/advertisements/data-access/models/advertisement.model';
import { AdvertisementDefinition, GenericState, IItem, Localization } from 'src/app/shared/data-access/models';
import {
    loadAdvertisement,
    loadAdvertisementError,
    loadAdvertisementSuccess,
    loadDefinitionsError,
    loadDefinitionsSuccess,
    loadImagesError,
    loadImagesSuccess,
    loadItemError,
    loadItemsError,
    loadItemsSuccess,
    loadItemSuccess,
    loadLocalizationsError,
    loadLocalizationsSuccess,
} from './settings-my-advertisements-form.actions';

export const SETTINGS_MY_ADVERTISEMENTS_FORM_STATE_FEATURE_KEY = 'settings my advertisements form';

export interface SettingsMyAdvertisementsFormState extends GenericState<Advertisement> {
    items: IItem[];
    localizations: Localization[];
    definitions: AdvertisementDefinition[];
}

export const initialState: SettingsMyAdvertisementsFormState = {
    data: null,
    error: null,
    status: 'pending',
    items: [],
    localizations: [],
    definitions: [],
};

export const settingsMyAdvertisementsFormReducer = createReducer(
    initialState,
    on(loadAdvertisement, (state) => ({
        ...state,
        data: null,
        status: 'loading',
        error: null,
    })),
    on(loadAdvertisementSuccess, (state, { advertisement }) => ({
        ...state,
        status: 'success',
        data: advertisement,
    })),
    on(loadAdvertisementError, (state, { error }) => ({
        ...state,
        status: 'error',
        error: error,
    })),
    on(loadItemsSuccess, (state, { items }) => ({
        ...state,
        items: items,
    })),
    on(loadItemsError, (state, { error }) => ({
        ...state,
        status: 'error',
        error: error,
    })),
    on(loadLocalizationsSuccess, (state, { localizations }) => ({
        ...state,
        localizations: localizations,
    })),
    on(loadLocalizationsError, (state, { error }) => ({
        ...state,
        status: 'error',
        error: error,
    })),
    on(loadDefinitionsSuccess, (state, { definitions }) => ({
        ...state,
        definitions: definitions,
    })),
    on(loadDefinitionsError, (state, { error }) => ({
        ...state,
        status: 'error',
        error: error,
    })),
    on(loadItemSuccess, (state, { item }) => ({
        ...state,
        data: { ...state.data, item: item } as Advertisement,
    })),
    on(loadItemError, (state, { error }) => ({
        ...state,
        status: 'error',
        error: error,
    })),

    on(loadImagesSuccess, (state, { images }) => ({
        ...state,
        data: { ...state.data, item: { ...state.data, images: images } as IItem } as Advertisement,
    })),
    on(loadImagesError, (state, { error }) => ({
        ...state,
        istatus: 'error',
        error: error,
    }))
);
