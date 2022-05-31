import { createReducer, on } from '@ngrx/store';
import { GenericState, IUser, Localization } from 'src/app/shared/data-access/models';
import {
    createLocalization,
    createLocalizationError,
    createLocalizationSuccess,
    deleteLocalization,
    deleteLocalizationError,
    deleteLocalizationSuccess,
    loadLocalizations,
    loadLocalizationsError,
    loadLocalizationsSuccess,
    loadUserError,
    loadUserSuccess,
    updateLocalization,
    updateLocalizationError,
    updateLocalizationSuccess,
} from './settings-my-account.actions';

export const SETTINGS_MY_ACCOUNT_STATE_FEATURE_KEY = 'settings my account';

export interface SettingsMyAccountState extends GenericState<IUser> {
    localizations: Localization[];
}

export const initialState: SettingsMyAccountState = {
    data: null,
    error: null,
    status: 'pending',
    localizations: [],
};

export const settingsMyAccountReducer = createReducer(
    initialState,
    on(loadUserSuccess, (state, { user }) => ({
        ...state,
        status: 'success',
        data: user,
    })),
    on(loadLocalizations, deleteLocalization, createLocalization, updateLocalization, (state) => ({
        ...state,
        status: 'loading',
        error: null,
    })),
    on(
        loadUserError,
        loadLocalizationsError,
        updateLocalizationError,
        createLocalizationError,
        deleteLocalizationError,
        (state, { error }) => ({
            ...state,
            error: error,
            status: 'error',
        })
    ),
    on(loadLocalizationsSuccess, (state, { localizations }) => ({
        ...state,
        status: 'success',
        localizations: localizations,
    })),
    on(createLocalizationSuccess, (state, { localization }) => ({
        ...state,
        status: 'success',
        localizations: [...state.localizations, localization],
    })),
    on(updateLocalizationSuccess, (state, { localization }) => ({
        ...state,
        status: 'success',
        localizations: state.localizations.map((value) => (value.id === localization.id ? { ...value, ...localization } : value)),
    })),
    on(updateLocalizationSuccess, (state, { localization }) => ({
        ...state,
        status: 'success',
        localizations: state.localizations.map((value) => (value.id === localization.id ? { ...value, ...localization } : value)),
    })),
    on(deleteLocalizationSuccess, (state, { id }) => ({
        ...state,
        status: 'success',
        localizations: state.localizations.filter((value) => value.id !== id),
    }))
);
