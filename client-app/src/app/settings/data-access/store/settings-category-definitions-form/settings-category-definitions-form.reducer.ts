import { createReducer, on } from '@ngrx/store';
import { CategoryDefinition } from '@models/';
import { GenericState } from '@utils/types';
import {
    createDefinition,
    createDefinitionError,
    createDefinitionSuccess,
    loadDefinition,
    loadDefinitionError,
    loadDefinitionSuccess,
    resetState,
    updateDefinition,
    updateDefinitionError,
    updateDefinitionSuccess,
} from './settings-category-definitions-form.actions';
export const SETTINGS_CATEGORY_DEFINITIONS_FORM_STATE_FEATURE_KEY = 'settings category definitions form';

export type SettingsCategoryDefinitionsFormState = GenericState<CategoryDefinition>;

export const initialState: SettingsCategoryDefinitionsFormState = {
    error: null,
    status: 'pending',
    data: null,
};

export const settingsCategoryDefinitionsFormReducer = createReducer(
    initialState,
    on(loadDefinition, (state) => ({
        ...state,
        status: 'loading',
        error: null,
    })),
    on(loadDefinitionSuccess, (state, { definiton }) => ({
        ...state,
        status: 'success',
        data: definiton,
    })),
    on(loadDefinitionError, createDefinitionError, updateDefinitionError, (state, { error }) => ({
        ...state,
        status: 'error',
        error: error,
    })),
    on(createDefinition, updateDefinition, (state) => ({
        ...state,
        status: 'loading',
    })),
    on(createDefinitionSuccess, updateDefinitionSuccess, (state) => ({
        ...state,
        status: 'success',
        //close: true,
    })),
    on(resetState, () => ({
        ...initialState,
    }))
);
