import { ActionReducerMap } from '@ngrx/store';
import { authenticationReducer } from '../modules/authentication/store/authentication.reducer';
import { AuthenticationState, AUTHENTICATION_STATE_NAME } from '../modules/authentication/store/authentication.state';

export const ADVERTISEMENT_CREATION_STATE_NAME = 'creation';

export interface RootState {
    [AUTHENTICATION_STATE_NAME]: AuthenticationState;
}

export const rootReducer: ActionReducerMap<RootState> = {
    [AUTHENTICATION_STATE_NAME]: authenticationReducer,
};
