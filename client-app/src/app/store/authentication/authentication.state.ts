import { IUser } from 'src/app/modules/core/models/user.model';
import { StateStatus } from 'src/app/modules/core/types/state-status.type';

export const AUTHENTICATION_STATE_NAME = 'authentication';

export interface AuthenticationState {
    user: IUser | null;
    status: StateStatus;
    error: string | null;
}

export const initialState: AuthenticationState = {
    user: null,
    status: 'pending',
    error: null,
};
