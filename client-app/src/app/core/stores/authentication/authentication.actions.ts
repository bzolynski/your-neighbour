import { createAction, props } from '@ngrx/store';
import { User } from '@models/';

export const signIn = createAction('[Authentication Store] Sign In', props<{ login: string; password: string }>());
export const signInSuccess = createAction('[Authentication Store] Sign In Success', props<{ user: User }>());
export const signInError = createAction('[Authentication Store] Sign In Error', props<{ error: string }>());

export const updateUserData = createAction('[Authentication Store] Update User Data', props<{ user: User }>());
export const signOut = createAction('[Authentication Store] Sign Out');
