import { AuthenticationEffects } from './authentication/authentication.effects';
import { authenticationReducer } from './authentication/authentication.reducer';
import { AuthenticationState, AUTHENTICATION_STATE_NAME } from './authentication/authentication.state';

export const ADVERTISEMENT_CREATION_STATE_NAME = 'creation';

export interface RootState {
    [AUTHENTICATION_STATE_NAME]: AuthenticationState;
}

export const rootReducer = {
    [AUTHENTICATION_STATE_NAME]: authenticationReducer,
};

export const RootEffects = [AuthenticationEffects];
