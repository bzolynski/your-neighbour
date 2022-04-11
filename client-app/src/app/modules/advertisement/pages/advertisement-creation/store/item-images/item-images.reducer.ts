import { createReducer, on } from '@ngrx/store';
import { addItemImage, loadItemImages, loadItemImagesError, loadItemImagesSuccess } from './item-images.action';
import { initialState } from './item-images.state';

export const itemImagesReducer = createReducer(
    initialState,
    on(addItemImage, (state, { image }) => ({
        ...state,
        images: [...state.images, image],
    })),
    on(loadItemImages, (state) => ({
        ...state,
        images: [],
        status: 'loading',
    })),
    on(loadItemImagesSuccess, (state, { images }) => ({
        ...state,
        images: images,
        status: 'success',
    })),
    on(loadItemImagesError, (state, { error }) => ({
        ...state,
        error: error,
        status: 'error',
    }))
);
