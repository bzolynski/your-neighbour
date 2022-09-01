import { createAction, props } from '@ngrx/store';
import { User } from '@models/';

export const loadUser = createAction('[SettingsMyAccountFormComponent] Load User');
export const loadUserSuccess = createAction('[SettingsMyAccountFormComponent] Load User Success', props<{ user: User }>());
export const loadUserError = createAction('[SettingsMyAccountFormComponent] Load User Error', props<{ error: string }>());

export const updateUser = createAction('[SettingsMyAccountFormComponent] Update User', props<{ id: number; user: User }>());
export const updateUserSuccess = createAction('[SettingsMyAccountFormComponent] Update User Success', props<{ user: User }>());
export const updateUserError = createAction('[SettingsMyAccountFormComponent] Update User Error', props<{ error: string }>());
