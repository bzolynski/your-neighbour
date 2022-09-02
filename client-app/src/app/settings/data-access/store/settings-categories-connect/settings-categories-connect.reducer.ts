import { createReducer, on } from '@ngrx/store';

import { Dictionary, GenericState, ITree } from '@app-types/.';
import { Category } from '@models/';
import {
    loadTree,
    loadTreeError,
    loadTreeSuccess,
    loadUnasignedCategoriesError,
    loadUnasignedCategoriesSuccess,
} from './settings-categories-connect.actions';
export const SETTINGS_CATEGORIES_CONNECT_STATE_FEATURE_KEY = 'settings categories connect';

export interface SettingsCategoriesConnectState extends GenericState<ITree<Category>> {
    unasignedCategories: Category[];
    changes: Dictionary<number, number | null>;
}

export const initialState: SettingsCategoriesConnectState = {
    error: null,
    status: 'pending',
    data: null,
    unasignedCategories: [],
    changes: new Dictionary<number, number | null>(),
    //close: false,
};

export const settingsCategoriesConnectReducer = createReducer(
    initialState,
    on(loadTree, (state) => ({
        ...state,
        status: 'loading',
        error: null,
    })),
    on(loadTreeSuccess, (state, { tree }) => ({
        ...state,
        status: 'success',
        data: tree,
    })),
    on(loadTreeError, loadUnasignedCategoriesError, (state, { error }) => ({
        ...state,
        status: 'error',
        error: error,
    })),
    on(loadUnasignedCategoriesSuccess, (state, { categories }) => ({
        ...state,
        status: 'success',
        unasignedCategories: categories,
    }))
);
