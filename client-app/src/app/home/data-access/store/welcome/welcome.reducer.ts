import { createReducer, on } from '@ngrx/store';
import { GenericState, IUser } from 'src/app/shared/data-access/models';
import { Advertisement } from '../../models/advertisement.model';
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
} from './welcome.actions';

export const ADVERTISEMENT_DETAILS_FEATURE_KEY = 'advertisement details';

export interface AdvertisementDetailsState extends GenericState<Advertisement> {
    user: IUser | null;
    favorite: boolean;
}

export const initialState: AdvertisementDetailsState = {
    data: null,
    user: null,
    error: null,
    status: 'pending',
    favorite: false,
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
        data: { ...state.data, item: { ...state.data?.item, images: images } } as Advertisement,
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
    }))
);
