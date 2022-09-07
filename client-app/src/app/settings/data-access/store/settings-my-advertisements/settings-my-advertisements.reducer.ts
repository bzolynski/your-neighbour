import { Advertisement } from '@models/';
import { createReducer, on } from '@ngrx/store';
import { GenericState } from '@app-types/.';
import {
    createAdvertisement,
    createAdvertisementSuccess,
    deleteAdvertisement,
    deleteAdvertisementError,
    deleteAdvertisementSuccess,
    loadAdvertisements,
    loadAdvertisementsError,
    loadAdvertisementsSuccess,
    loadImagesError,
    loadImagesSuccess,
    updateAdvertisement,
    updateAdvertisementSuccess,
} from './settings-my-advertisements.actions';

export const SETTINGS_MY_ADVERTISEMENTS_STATE_FEATURE_KEY = 'settings my advertisements';

export type SettingsMyAdvertisementsState = GenericState<Advertisement[]>;

export const initialState: SettingsMyAdvertisementsState = {
    error: null,
    status: 'pending',
    data: null,
};

export const settingsMyAdvertisementsReducer = createReducer(
    initialState,
    on(loadAdvertisements, (state) => ({
        ...state,
        status: 'loading',
        error: null,
    })),
    on(loadAdvertisementsSuccess, (state, { advertisements }) => ({
        ...state,
        status: 'success',
        data: advertisements,
    })),
    on(loadAdvertisementsError, (state, { error }) => ({
        ...state,
        status: 'error',
        error: error,
    })),
    on(createAdvertisement, updateAdvertisement, deleteAdvertisement, (state) => ({
        ...state,
        status: 'loading',
        error: null,
    })),
    on(deleteAdvertisementSuccess, (state, { id }) => ({
        ...state,
        status: 'success',
        data: (state.data ?? []).filter((value) => value.id !== id),
    })),
    on(deleteAdvertisementError, (state, { error }) => ({
        ...state,
        status: 'error',
        error: error,
    })),
    on(loadImagesSuccess, (state, { advertisementId, images }) => ({
        ...state,
        status: 'success',
        data: (state.data ?? []).map((value) =>
            value.id === advertisementId ? ({ ...value, images: images } as Advertisement) : value
        ),
    })),
    on(createAdvertisementSuccess, updateAdvertisementSuccess, (state) => ({
        ...state,
        status: 'success',
    })),
    on(loadImagesError, (state, { error }) => ({
        ...state,
        status: 'error',
        error: error,
    }))
);
