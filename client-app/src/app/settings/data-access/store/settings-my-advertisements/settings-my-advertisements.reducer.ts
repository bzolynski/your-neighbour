import { Advertisement } from '@models/';
import { createReducer, on } from '@ngrx/store';
import { GenericState } from '@app-types/.';
import { IItem } from 'src/app/shared/data-access/models';
import { ListViewType } from 'src/app/shared/ui/list-container/list-container.component';
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

export interface SettingsMyAdvertisementsState extends GenericState<Advertisement[]> {
    listViewType: ListViewType;
}

export const initialState: SettingsMyAdvertisementsState = {
    error: null,
    status: 'pending',
    listViewType: 'list',
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
    on(loadImagesSuccess, (state, { itemId, images }) => ({
        ...state,
        status: 'success',
        data: (state.data ?? []).map((value) =>
            value.item.id === itemId ? ({ ...value, item: { ...value.item, images: images } as IItem } as Advertisement) : value
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
