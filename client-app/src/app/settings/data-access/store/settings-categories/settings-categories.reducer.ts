import { createReducer, on } from '@ngrx/store';
import { GenericState, ICategory } from 'src/app/shared/data-access/models';
import { loadCategories, loadCategoriesError, loadCategoriesSuccess } from './settings-categories.actions';
export const SETTINGS_CATEGORIES_STATE_FEATURE_KEY = 'settings categories';

export type SettingsCategoriesState = GenericState<ICategory[]>;

export const initialState: SettingsCategoriesState = {
    error: null,
    status: 'pending',
    data: [],
};

export const settingsCategoriesReducer = createReducer(
    initialState,
    on(loadCategories, (state) => ({
        ...state,
        status: 'loading',
        error: null,
    })),
    on(loadCategoriesSuccess, (state, { categories }) => ({
        ...state,
        status: 'success',
        data: categories,
    })),
    on(loadCategoriesError, (state, { error }) => ({
        ...state,
        status: 'error',
        error: error,
    }))
);
