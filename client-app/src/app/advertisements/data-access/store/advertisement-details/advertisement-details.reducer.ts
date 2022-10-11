import { createReducer, on } from '@ngrx/store';
import { Advertisement, User } from '@core/models/';
import { GenericState } from '@core/types/.';
import { resetState } from '.';
import {
    addFavorite,
    addFavoriteError,
    addFavoriteSuccess,
    deleteFavorite,
    deleteFavoriteError,
    deleteFavoriteSuccess,
    loadAdvertisement,
    loadAdvertisementError,
    loadAdvertisementSuccess,
    loadImages,
    loadImagesError,
    loadImagesSuccess,
    loadUser,
    loadUserError,
    loadUserSuccess,
    setIsOwner,
} from './advertisement-details.actions';

export const ADVERTISEMENT_DETAILS_FEATURE_KEY = 'advertisement details';

export interface AdvertisementDetailsState extends GenericState<Advertisement> {
    user: User | null;
    favorite: boolean;
    isOwner: boolean;
}

export const initialState: AdvertisementDetailsState = {
    data: null,
    user: null,
    error: null,
    status: 'pending',
    favorite: false,
    isOwner: false,
};

export const advertisementDetailsReducer = createReducer(
    initialState,
    on(loadAdvertisement, loadUser, loadImages, addFavorite, deleteFavorite, (state) => ({
        ...state,
        status: 'loading',
        error: null,
    })),
    on(loadAdvertisementSuccess, (state, { advertisement }) => ({
        ...state,
        status: 'success',
        data: advertisement,
    })),
    on(loadUserSuccess, (state, { user }) => ({
        ...state,
        status: 'success',
        user: user,
    })),
    on(loadImagesSuccess, (state, { images }) => ({
        ...state,
        status: 'success',
        data: { ...state.data, images: images } as Advertisement,
    })),
    on(loadUserError, loadAdvertisementError, loadImagesError, addFavoriteError, deleteFavoriteError, (state, { error }) => ({
        ...state,
        error: error,
        status: 'error',
    })),
    on(addFavoriteSuccess, (state) => ({
        ...state,
        status: 'success',
        favorite: true,
    })),
    on(deleteFavoriteSuccess, (state) => ({
        ...state,
        status: 'success',
        favorite: false,
    })),
    on(setIsOwner, (state, { isOwner }) => ({
        ...state,
        isOwner: isOwner,
    })),
    on(resetState, () => ({
        ...initialState,
    }))
);
