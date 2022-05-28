import { createReducer, on } from '@ngrx/store';
import { GenericState, ICategory } from 'src/app/shared/data-access/models';
import { deleteCategorySuccess } from '../settings-categories-details';
import { createCategorySuccess, updateCategorySuccess } from '../settings-categories-form';
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
    })),
    on(deleteCategorySuccess, (state, { id }) => ({
        ...state,
        data: (state.data ?? []).filter((value) => value.id !== id),
    })),
    on(createCategorySuccess, (state, { category }) => ({
        ...state,
        data: [...(state.data ?? []), category],
    })),
    on(updateCategorySuccess, (state, { category }) => ({
        ...state,
        data: (state.data ?? []).map((value) => (value.id === category.id ? { ...value, ...category } : value)),
    }))
);
