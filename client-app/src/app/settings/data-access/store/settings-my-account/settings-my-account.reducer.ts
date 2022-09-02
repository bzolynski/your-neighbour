import { createReducer, on } from '@ngrx/store';
import { Localization, User } from '@models/';
import { GenericState } from '@app-types/.';
import { updateUserSuccess } from '../settings-my-account-form';
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
    setPrimaryLocalization,
    setPrimaryLocalizationError,
    setPrimaryLocalizationSuccess,
    updateLocalization,
    updateLocalizationError,
    updateLocalizationSuccess,
} from './settings-my-account.actions';

export const SETTINGS_MY_ACCOUNT_STATE_FEATURE_KEY = 'settings my account';

export interface SettingsMyAccountState extends GenericState<User> {
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
    on(loadLocalizations, deleteLocalization, createLocalization, updateLocalization, setPrimaryLocalization, (state) => ({
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
        setPrimaryLocalizationError,
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
    })),
    on(setPrimaryLocalizationSuccess, (state, { id }) => ({
        ...state,
        status: 'success',
        localizations: state.localizations.map((value) =>
            value.id === id ? { ...value, isPrimary: true } : { ...value, isPrimary: false }
        ),
    })),
    on(updateUserSuccess, (state, { user }) => ({
        ...state,
        data: { ...state.data, ...user } as User,
    }))
);
