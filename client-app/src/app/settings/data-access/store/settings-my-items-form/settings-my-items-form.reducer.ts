import { createReducer, on } from '@ngrx/store';
import { GenericState, ICategory, IItem } from 'src/app/shared/data-access/models';
import {
    closeForm,
    createItemSuccess,
    loadCategoriesError,
    loadCategoriesSuccess,
    loadImagesError,
    loadImagesSuccess,
    loadItem,
    loadItemError,
    loadItemSuccess,
    resetState,
    updateItemSuccess,
} from './settings-my-items-form.actions';

export const SETTINGS_MY_ITEM_FORM_STATE_FEATURE_KEY = 'settings my items form';

export interface SettingsMyItemsFormState extends GenericState<IItem> {
    categories: ICategory[];
    open: boolean;
}

export const initialState: SettingsMyItemsFormState = {
    data: null,
    error: null,
    status: 'pending',
    categories: [],
    open: true,
};

export const settingsMyItemsFormReducer = createReducer(
    initialState,
    on(loadItem, (state) => ({
        ...state,
        status: 'loading',
        error: null,
    })),
    on(loadItemSuccess, (state, { item }) => ({
        ...state,
        status: 'success',
        data: item,
    })),
    on(loadItemError, (state, { error }) => ({
        ...state,
        status: 'error',
        error: error,
    })),
    on(loadImagesSuccess, (state, { images }) => ({
        ...state,
        status: 'success',
        data: { ...state.data, images: images } as IItem,
    })),
    on(loadImagesError, (state, { error }) => ({
        ...state,
        istatus: 'error',
        error: error,
    })),
    on(loadCategoriesSuccess, (state, { categories }) => ({
        ...state,
        categories: categories,
    })),
    on(loadCategoriesError, (state, { error }) => ({
        ...state,
        istatus: 'error',
        error: error,
    })),
    on(closeForm, updateItemSuccess, createItemSuccess, (state) => ({
        ...state,
        open: false,
    })),
    on(resetState, () => ({
        ...initialState,
    }))
);
