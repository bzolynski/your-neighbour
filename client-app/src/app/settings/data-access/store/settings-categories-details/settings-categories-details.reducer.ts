import { createReducer, on } from '@ngrx/store';
import { GenericState, ICategory } from 'src/app/shared/data-access/models';
import {
    deleteCategory,
    deleteCategoryError,
    deleteCategorySuccess,
    loadCategory,
    loadCategoryError,
    loadCategorySuccess,
} from './settings-categories-details.actions';
export const SETTINGS_CATEGORIES_DETAILS_STATE_FEATURE_KEY = 'settings categories details';

export interface SettingsCategoriesDetailsState extends GenericState<ICategory> {
    deleted: boolean;
}

export const initialState: SettingsCategoriesDetailsState = {
    error: null,
    status: 'pending',
    data: null,
    deleted: false,
};

export const settingsCategoriesDetailsReducer = createReducer(
    initialState,
    on(loadCategory, (state) => ({
        ...state,
        status: 'loading',
        error: null,
    })),
    on(loadCategorySuccess, (state, { category }) => ({
        ...state,
        status: 'success',
        data: category,
    })),
    on(loadCategoryError, deleteCategoryError, (state, { error }) => ({
        ...state,
        status: 'error',
        error: error,
    })),
    on(deleteCategory, (state) => ({
        ...state,
        status: 'loading',
        error: null,
    })),
    on(deleteCategorySuccess, (state) => ({
        ...state,
        status: 'success',
        deleted: true,
    }))
);
