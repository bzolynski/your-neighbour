import { createReducer, on } from '@ngrx/store';
import { AdvertisementForm } from 'src/app/settings/feature/settings-my-advertisements-form/settings-my-advertisements-form.component';
import { Advertisement, AdvertisementDefinition, Localization } from '@models/';
import { GenericState } from '@app-types/.';
import {
    createAdvertisement,
    createAdvertisementSuccess,
    loadAdvertisement,
    loadAdvertisementError,
    loadAdvertisementSuccess,
    loadDefinitionsError,
    loadDefinitionsSuccess,
    loadImagesError,
    loadImagesSuccess,
    loadLocalizationsError,
    loadLocalizationsSuccess,
    resetState,
    updateAdvertisement,
    updateAdvertisementSuccess,
} from './settings-my-advertisements-form.actions';

export const SETTINGS_MY_ADVERTISEMENTS_FORM_STATE_FEATURE_KEY = 'settings my advertisements form';

export interface SettingsMyAdvertisementsFormState extends GenericState<AdvertisementForm> {
    localizations: Localization[];
    definitions: AdvertisementDefinition[];
    submited: boolean;
}

export const initialState: SettingsMyAdvertisementsFormState = {
    data: null,
    error: null,
    status: 'pending',
    localizations: [],
    definitions: [],
    submited: false,
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
        data: {
            dateCreated: advertisement.dateCreated,
            definitionId: advertisement.definition.id,
            description: advertisement.description,
            localizationId: advertisement.localization.id,
            title: advertisement.title,
        },
    })),
    on(loadAdvertisementError, (state, { error }) => ({
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
    on(loadImagesSuccess, (state, { images }) => ({
        ...state,
        data: { ...state.data, images: images } as Advertisement,
    })),
    on(loadImagesError, (state, { error }) => ({
        ...state,
        status: 'error',
        error: error,
    })),
    on(createAdvertisement, updateAdvertisement, (state) => ({
        ...state,
        status: 'loading',
    })),
    on(createAdvertisementSuccess, updateAdvertisementSuccess, (state) => ({
        ...state,
        status: 'success',
        submited: true,
    })),
    on(resetState, () => ({
        ...initialState,
    }))
);
