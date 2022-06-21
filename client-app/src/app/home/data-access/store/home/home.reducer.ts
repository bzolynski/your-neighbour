import { createReducer, on } from '@ngrx/store';
import { Advertisement } from 'src/app/advertisements/data-access/models/advertisement.model';
import { GenericState, IItem } from 'src/app/shared/data-access/models';
import {
    loadAdvertisements,
    loadAdvertisementsError,
    loadAdvertisementsSuccess,
    loadImagesError,
    loadImagesSuccess,
} from './home.actions';

export const HOME_FEATURE_KEY = 'home';

export type HomeState = GenericState<Advertisement[]>;

export const initialState: HomeState = {
    data: null,
    error: null,
    status: 'pending',
};

export const homeReducer = createReducer(
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
    on(loadImagesSuccess, (state, { itemId, images }) => ({
        ...state,
        status: 'success',
        data: (state.data ?? []).map((value) =>
            value.item.id === itemId ? ({ ...value, item: { ...value.item, images: images } as IItem } as Advertisement) : value
        ),
    })),
    on(loadAdvertisementsError, loadImagesError, (state, { error }) => ({
        ...state,
        error: error,
        status: 'error',
    }))
);
