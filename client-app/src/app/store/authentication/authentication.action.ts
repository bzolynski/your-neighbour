import { createAction, props } from '@ngrx/store';
import { IUser } from 'src/app/modules/core/models/user.model';

export const signIn = createAction('[Authentication] Sign in', props<{ login: string; password: string }>());
export const signInSuccess = createAction('[Authentication] Sign In Success', props<{ user: IUser }>());
export const signInError = createAction('[Authentication] Sign In Error', props<{ error: string }>());

export const signOut = createAction('[Authentication] Sign Out');
