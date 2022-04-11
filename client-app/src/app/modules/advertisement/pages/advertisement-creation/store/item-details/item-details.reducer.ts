import { createReducer, on } from '@ngrx/store';
import { loadItemDetails, loadItemDetailsError, loadItemDetailsSuccess } from './item-details.action';
import { initialState } from './item-details.state';

export const advertisementItemDetailsReducer = createReducer(
    initialState,
    on(loadItemDetails, (state) => ({
        ...state,
        status: 'loading',
    })),
    on(loadItemDetailsSuccess, (state, { itemDetails }) => ({
        ...state,
        itemDetails: itemDetails,
        status: 'success',
    })),
    on(loadItemDetailsError, (state, { error }) => ({
        ...state,
        error: error,
        status: 'error',
    }))
);
