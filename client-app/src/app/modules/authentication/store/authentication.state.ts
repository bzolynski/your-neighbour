import { MetaReducer } from '@ngrx/store';
import { IUser } from 'src/app/modules/core/models/user.model';
import { authenticationHydrationMetaReducer } from './authentication-hydration.reducer';

export const AUTHENTICATION_STATE_NAME = 'authentication';

export interface AuthenticationState {
    user: IUser | null;
    isBusy: boolean;
    error: string | null;
}

export const metaReducers: MetaReducer[] = [authenticationHydrationMetaReducer];

export const initialState: AuthenticationState = {
    user: null,
    isBusy: false,
    error: null,
};
