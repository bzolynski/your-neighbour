import { IUser } from 'src/app/modules/core/models/user.model';

export const AUTHENTICATION_STATE_NAME = 'authentication';

export interface AuthenticationState {
    user: IUser | null;
    isBusy: boolean;
    error: string | null;
}

export const initialState: AuthenticationState = {
    user: null,
    isBusy: false,
    error: null,
};
