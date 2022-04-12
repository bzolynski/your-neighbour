import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { signIn, signInError, signInSuccess, signOutSuccess } from './authentication.action';
import { AuthenticationState, initialState } from './authentication.state';

export const authenticationReducer: ActionReducer<AuthenticationState, Action> = createReducer(
    initialState,
    on(signIn, (state) => ({
        ...state,
        isBusy: true,
    })),
    on(signInSuccess, (state, { user }) => ({
        ...state,
        user: user,
        isBusy: false,
    })),
    on(signInError, (state, { error }) => ({
        ...state,
        error: error,
        isBusy: false,
    })),
    on(signOutSuccess, (state) => ({
        ...state,
        user: null,
    }))
);
