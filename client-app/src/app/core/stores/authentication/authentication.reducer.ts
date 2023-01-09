import { createReducer, on } from '@ngrx/store';
import { User } from '@core/models/';
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
    error: string | null;
}

export const initialState: AuthenticationState = {
    user: null,
    error: null,
};

export const authenticationReducer = createReducer(
    initialState,
    on(signIn, signUp, (state) => ({
        ...state,
        error: null,
    })),
    on(signInSuccess, (state, { user }) => ({
        ...state,
        user: user,
    })),
    on(signUpSuccess, (state) => ({
        ...state,
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
        error: error,
    }))
);
