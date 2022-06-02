import { createAction, props } from '@ngrx/store';
import { IUser } from 'src/app/shared/data-access/models';

export const loadUser = createAction('[SettingsMyAccountFormComponent] Load User');
export const loadUserSuccess = createAction('[SettingsMyAccountFormComponent] Load User Success', props<{ user: IUser }>());
export const loadUserError = createAction('[SettingsMyAccountFormComponent] Load User Error', props<{ error: string }>());

export const updateUser = createAction('[SettingsMyAccountFormComponent] Update User', props<{ id: number; user: IUser }>());
export const updateUserSuccess = createAction('[SettingsMyAccountFormComponent] Update User Success', props<{ user: IUser }>());
export const updateUserError = createAction('[SettingsMyAccountFormComponent] Update User Error', props<{ error: string }>());
