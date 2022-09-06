import { createReducer, on } from '@ngrx/store';
import { GenericStoreStatus } from '@app-types/.';
import { User } from '@models/';
import {
    signIn,
    signInError,
    signInSuccess,
    signOut,
    signUp,
    signUpError,
    signUpSuccess,
    updateUserData,
} from './authentication.actions';

export const AUTHENTICATION_STATE_KEY = 'authentication state key';

export interface AuthenticationState {
    user: User | null;
    status: GenericStoreStatus;
    error: string | null;
}

export const initialState: AuthenticationState = {
    user: null,
    status: 'pending',
    error: null,
};

export const authenticationReducer = createReducer(
    initialState,
    on(signIn, signUp, (state) => ({
        ...state,
        status: 'loading',
        error: null,
    })),
    on(signInSuccess, (state, { user }) => ({
        ...state,
        status: 'success',
        user: user,
    })),
    on(signUpSuccess, (state) => ({
        ...state,
        status: 'success',
    })),
    on(signOut, (state) => ({
        ...state,
        user: null,
    })),
    on(updateUserData, (state, { user }) => ({
        ...state,
        user: { ...state.user, ...user },
    })),
    on(signInError, signUpError, (state, { error }) => ({
        ...state,
        status: 'error',
        error: error,
    }))
);
