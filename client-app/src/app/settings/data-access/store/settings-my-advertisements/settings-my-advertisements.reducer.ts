import { createReducer, on } from '@ngrx/store';
import { Advertisement } from 'src/app/advertisements/data-access/models/advertisement.model';
import { GenericState, IItem } from 'src/app/shared/data-access/models';
import { ListViewType } from 'src/app/shared/ui/list-container/list-container.component';
import {
    changeListViewType,
    deleteAdvertisement,
    deleteAdvertisementError,
    deleteAdvertisementSuccess,
    loadAdvertisements,
    loadAdvertisementsError,
    loadAdvertisementsSuccess,
    loadImagesError,
    loadImagesSuccess,
} from './settings-my-advertisements.actions';

export const SETTINGS_MY_ADVERTISEMENTS_STATE_FEATURE_KEY = 'settings my advertisements';

export interface SettingsMyAdvertisementsState extends GenericState<Advertisement[]> {
    listViewType: ListViewType;
}

export const initialState: SettingsMyAdvertisementsState = {
    error: null,
    status: 'pending',
    listViewType: 'list',
    data: [],
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
    on(changeListViewType, (state, { listViewType }) => ({
        ...state,
        listViewType: listViewType,
    })),
    on(loadImagesSuccess, (state, { itemId, images }) => ({
        ...state,
        status: 'success',
        data: (state.data ?? []).map((value) =>
            value.item.id === itemId ? ({ ...value, item: { ...value.item, images: images } as IItem } as Advertisement) : value
        ),
    })),
    on(loadImagesError, (state, { error }) => ({
        ...state,
        status: 'error',
        error: error,
    }))
);
