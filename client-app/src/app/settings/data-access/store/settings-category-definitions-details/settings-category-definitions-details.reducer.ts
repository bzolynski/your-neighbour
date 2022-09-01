import { createReducer, on } from '@ngrx/store';
import { CategoryDefinition } from '@models/';
import { GenericState } from '@utils/types';
import {
    deleteDefinition,
    deleteDefinitionError,
    deleteDefinitionSuccess,
    loadDefinition,
    loadDefinitionError,
    loadDefinitionSuccess,
    resetState,
} from './settings-category-definitions-details.actions';
export const SETTINGS_CATEGORY_DEFINITIONS_DETAILS_STATE_FEATURE_KEY = 'settings category definitions details';

export interface SettingsCategoryDefinitionsDetailsState extends GenericState<CategoryDefinition> {
    deleted: boolean;
}

export const initialState: SettingsCategoryDefinitionsDetailsState = {
    error: null,
    status: 'pending',
    data: null,
    deleted: false,
};

export const settingsCategoryDefinitionsDetailsReducer = createReducer(
    initialState,
    on(loadDefinition, (state) => ({
        ...state,
        status: 'loading',
        error: null,
    })),
    on(loadDefinitionSuccess, (state, { definition }) => ({
        ...state,
        status: 'success',
        data: definition,
    })),
    on(loadDefinitionError, deleteDefinitionError, (state, { error }) => ({
        ...state,
        status: 'error',
        error: error,
    })),
    on(deleteDefinition, (state) => ({
        ...state,
        status: 'loading',
        error: null,
    })),
    on(deleteDefinitionSuccess, (state) => ({
        ...state,
        status: 'success',
        deleted: true,
    })),

    on(resetState, () => ({
        ...initialState,
    }))
);
