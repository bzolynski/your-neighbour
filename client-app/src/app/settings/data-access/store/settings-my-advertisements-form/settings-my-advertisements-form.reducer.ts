import { createReducer, on } from '@ngrx/store';
import { Advertisement } from 'src/app/advertisements/data-access/models/advertisement.model';
import { AdvertisementForm } from 'src/app/settings/feature/settings-my-advertisements-form/settings-my-advertisements-form.component';
import { AdvertisementDefinition, GenericState, IItem, Localization } from 'src/app/shared/data-access/models';
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
    loadItemError,
    loadItemsError,
    loadItemsSuccess,
    loadItemSuccess,
    loadLocalizationsError,
    loadLocalizationsSuccess,
    resetState,
    setFormSnapshot,
    updateAdvertisement,
    updateAdvertisementSuccess,
} from './settings-my-advertisements-form.actions';

export const SETTINGS_MY_ADVERTISEMENTS_FORM_STATE_FEATURE_KEY = 'settings my advertisements form';

export interface SettingsMyAdvertisementsFormState extends GenericState<AdvertisementForm> {
    items: IItem[];
    localizations: Localization[];
    definitions: AdvertisementDefinition[];
    submited: boolean;
}

export const initialState: SettingsMyAdvertisementsFormState = {
    data: null,
    error: null,
    status: 'pending',
    items: [],
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
            itemId: advertisement.item.id,
            localizationId: advertisement.localization.id,
            title: advertisement.title,
        },
    })),
    on(loadAdvertisementError, (state, { error }) => ({
        ...state,
        status: 'error',
        error: error,
    })),
    on(setFormSnapshot, (state, { formSnapshot }) => ({
        ...state,
        data: formSnapshot,
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
