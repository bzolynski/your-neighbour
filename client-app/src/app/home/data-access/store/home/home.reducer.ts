import { createReducer, on } from '@ngrx/store';
import { Advertisement } from '@core/models/';
import { GenericState } from '@core/types/.';
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
    on(loadImagesSuccess, (state, { advertisementId, images }) => ({
        ...state,
        status: 'success',
        data: (state.data ?? []).map((value) =>
            value.id === advertisementId ? ({ ...value, images: images } as Advertisement) : value
        ),
    })),
    on(loadAdvertisementsError, loadImagesError, (state, { error }) => ({
        ...state,
        error: error,
        status: 'error',
    }))
);
