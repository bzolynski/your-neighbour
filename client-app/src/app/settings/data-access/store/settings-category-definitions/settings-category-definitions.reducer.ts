import { createReducer, on } from '@ngrx/store';
import { GenericState, ICategoryDefinition } from 'src/app/shared/data-access/models';
import { loadDefinitionsError } from '../settings-my-advertisements-form';
import { loadDefinitions, loadDefinitionsSuccess } from './settings-category-definitions.actions';
export const SETTINGS_CATEGORY_DEFINITIONS_STATE_FEATURE_KEY = 'settings category definitions';

export type SettingsCategoryDefinitionsState = GenericState<ICategoryDefinition[]>;

export const initialState: SettingsCategoryDefinitionsState = {
    error: null,
    status: 'pending',
    data: [],
};

export const settingsCategoryDefinitionsReducer = createReducer(
    initialState,
    on(loadDefinitions, (state) => ({
        ...state,
        status: 'loading',
        error: null,
    })),
    on(loadDefinitionsSuccess, (state, { definitions }) => ({
        ...state,
        status: 'success',
        data: definitions,
    })),
    on(loadDefinitionsError, (state, { error }) => ({
        ...state,
        status: 'error',
        error: error,
    })) /*
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
    })),*/
);
