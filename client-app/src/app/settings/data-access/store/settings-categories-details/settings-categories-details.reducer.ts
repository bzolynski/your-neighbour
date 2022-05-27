import { createReducer, on } from '@ngrx/store';
import { GenericState, ICategory } from 'src/app/shared/data-access/models';
import { loadCategory, loadCategoryError, loadCategorySuccess } from './settings-categories-details.actions';
export const SETTINGS_CATEGORIES_DETAILS_STATE_FEATURE_KEY = 'settings categories details';

export type SettingsCategoriesDetailsState = GenericState<ICategory>;

export const initialState: SettingsCategoriesDetailsState = {
    error: null,
    status: 'pending',
    data: null,
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
    on(loadCategoryError, (state, { error }) => ({
        ...state,
        status: 'error',
        error: error,
    }))
);
