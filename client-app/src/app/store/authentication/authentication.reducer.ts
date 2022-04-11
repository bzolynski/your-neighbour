import { createReducer, on } from '@ngrx/store';
import { signIn, signInError, signInSuccess, signOut } from './authentication.action';
import { initialState } from './authentication.state';

export const authenticationReducer = createReducer(
    initialState,
    on(signIn, (state) => ({
        ...state,
        status: 'loading',
    })),
    on(signInSuccess, (state, { user }) => ({
        ...state,
        user: user,
        status: 'success',
    })),
    on(signInError, (state, { error }) => ({
        ...state,
        error: error,
        status: 'error',
    })),
    on(signOut, (state) => ({
        ...state,
        user: null,
    }))
);
