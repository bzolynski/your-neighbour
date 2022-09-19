import { Advertisement } from '@models/';
import { createReducer, on } from '@ngrx/store';
import { GenericState } from '@app-types/.';
import {
    addToList,
    addToListSuccess,
    deleteAdvertisement,
    deleteAdvertisementError,
    deleteAdvertisementSuccess,
    loadAdvertisements,
    loadAdvertisementsError,
    loadAdvertisementsSuccess,
    updateOnList,
    updateOnListSuccess,
} from './settings-advertisements.actions';

export const SETTINGS_ADVERTISEMENTS_STATE_FEATURE_KEY = 'settings advertisements';

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
    on(deleteAdvertisement, (state) => ({
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
    on(addToList, updateOnList, (state) => ({
        ...state,
        status: 'loading',
    })),
    on(addToListSuccess, (state, { advertisement }) => ({
        ...state,
        status: 'success',
        data: [...(state.data ?? []), advertisement],
    })),
    on(updateOnListSuccess, (state, { advertisement }) => ({
        ...state,
        status: 'success',
        data: (state.data ?? []).map((value) => (value.id === advertisement.id ? advertisement : value)),
    }))
);
