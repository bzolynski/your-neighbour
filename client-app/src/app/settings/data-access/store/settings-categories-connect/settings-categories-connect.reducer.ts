import { createReducer, on } from '@ngrx/store';
import { Dictionary } from 'src/app/modules/core/types';
import { ITree } from 'src/app/modules/tree-view/models';
import { GenericState, ICategory } from 'src/app/shared/data-access/models';
import {
    loadTree,
    loadTreeError,
    loadTreeSuccess,
    loadUnasignedCategoriesError,
    loadUnasignedCategoriesSuccess,
} from './settings-categories-connect.actions';
export const SETTINGS_CATEGORIES_CONNECT_STATE_FEATURE_KEY = 'settings categories connect';

export interface SettingsCategoriesConnectState extends GenericState<ITree<ICategory>> {
    unasignedCategories: ICategory[];
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
