import { createReducer, on } from '@ngrx/store';
import { CategoryDefinition, Category } from '@models/';
import { GenericState } from '@app-types/.';
import {
    createCategory,
    createCategoryError,
    createCategorySuccess,
    loadCategory,
    loadCategoryError,
    loadCategorySuccess,
    loadDefinitionsError,
    loadDefinitionsSuccess,
    resetState,
    updateCategory,
    updateCategoryError,
    updateCategorySuccess,
} from './settings-categories-form.actions';
export const SETTINGS_CATEGORIES_FORM_STATE_FEATURE_KEY = 'settings categories form';

export interface SettingsCategoriesFormState extends GenericState<Category> {
    definitions: CategoryDefinition[];
    //close: boolean;
}

export const initialState: SettingsCategoriesFormState = {
    error: null,
    status: 'pending',
    data: null,
    definitions: [],
    //close: false,
};

export const settingsCategoriesFormReducer = createReducer(
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
    on(loadCategoryError, loadDefinitionsError, createCategoryError, updateCategoryError, (state, { error }) => ({
        ...state,
        status: 'error',
        error: error,
    })),
    on(loadDefinitionsSuccess, (state, { definitions }) => ({
        ...state,
        status: 'success',
        definitions: definitions,
    })),
    on(createCategory, updateCategory, (state) => ({
        ...state,
        status: 'loading',
    })),
    on(createCategorySuccess, updateCategorySuccess, (state) => ({
        ...state,
        status: 'success',
        //close: true,
    })),
    on(resetState, () => ({
        ...initialState,
    }))
);
