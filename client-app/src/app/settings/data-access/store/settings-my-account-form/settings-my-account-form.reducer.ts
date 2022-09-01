import { createReducer, on } from '@ngrx/store';
import { User } from '@models/';
import { GenericState } from '@utils/types';
import {
    loadUser,
    loadUserError,
    loadUserSuccess,
    updateUser,
    updateUserError,
    updateUserSuccess,
} from './settings-my-account-form.actions';
export const SETTINGS_MY_ACCOUNT_FORM_STATE_FEATURE_KEY = 'settings my account form';

export type SettingsMyAccountFormState = GenericState<User>;

export const initialState: SettingsMyAccountFormState = {
    error: null,
    status: 'pending',
    data: null,
};

export const settingsMyAccountFormReducer = createReducer(
    initialState,
    on(loadUser, (state) => ({
        ...state,
        status: 'loading',
        error: null,
    })),
    on(loadUserSuccess, (state, { user }) => ({
        ...state,
        status: 'success',
        data: user,
    })),
    on(loadUserError, updateUserError, (state, { error }) => ({
        ...state,
        status: 'error',
        error: error,
    })),
    on(updateUser, (state) => ({
        ...state,
        status: 'loading',
    })),
    on(updateUserSuccess, (state, { user }) => ({
        ...state,
        data: user,
        status: 'success',
    }))
);
