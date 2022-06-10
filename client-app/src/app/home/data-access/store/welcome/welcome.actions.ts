import { createAction, props } from '@ngrx/store';

export const login = createAction('[Welcome] Login', props<{ login: string; password: string }>());
export const loginSuccess = createAction('[Welcome] Login Success');
export const loginError = createAction('[Welcome] Login Error', props<{ error: string }>());

export const register = createAction('[Welcome] Register', props<{ email: string; password: string; confirmPassword: string }>());
export const registerSuccess = createAction('[Welcome] Register Success');
export const registerError = createAction('[Welcome] Register Error', props<{ error: string }>());
