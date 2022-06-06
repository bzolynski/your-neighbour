import { createAction, props } from '@ngrx/store';
import { IUser, Localization } from 'src/app/shared/data-access/models';

export const loadUser = createAction('[SettingsMyAccountComponent] Load User');
export const loadUserSuccess = createAction('[SettingsMyAccountComponent] Load User Success', props<{ user: IUser }>());
export const loadUserError = createAction('[SettingsMyAccountComponent] Load User Error', props<{ error: string }>());

export const loadLocalizations = createAction('[SettingsMyAccountComponent] Load Localizations');
export const loadLocalizationsSuccess = createAction(
    '[SettingsMyAccountComponent] Load Localizations Success',
    props<{ localizations: Localization[] }>()
);
export const loadLocalizationsError = createAction(
    '[SettingsMyAccountComponent] Load Localizations Error',
    props<{ error: string }>()
);

export const createLocalization = createAction(
    '[SettingsMyAccountComponent] Create Localization',
    props<{ localization: Localization }>()
);
export const createLocalizationSuccess = createAction(
    '[SettingsMyAccountComponent] Create Localization Success',
    props<{ localization: Localization }>()
);
export const createLocalizationError = createAction(
    '[SettingsMyAccountComponent] Create Localization Error',
    props<{ error: string }>()
);
export const updateLocalization = createAction(
    '[SettingsMyAccountComponent] Update Localization',
    props<{ id: number; localization: Localization }>()
);
export const updateLocalizationSuccess = createAction(
    '[SettingsMyAccountComponent] Update Localization Success',
    props<{ localization: Localization }>()
);
export const updateLocalizationError = createAction(
    '[SettingsMyAccountComponent] Update Localization Error',
    props<{ error: string }>()
);

export const deleteLocalization = createAction('[SettingsMyAccountComponent] Delete Localization', props<{ id: number }>());
export const deleteLocalizationSuccess = createAction(
    '[SettingsMyAccountComponent] Delete Localization Success',
    props<{ id: number }>()
);
export const deleteLocalizationError = createAction(
    '[SettingsMyAccountComponent] Delete Localization Error',
    props<{ error: string }>()
);
export const setPrimaryLocalization = createAction(
    '[SettingsMyAccountComponent] Set Primary Localization',
    props<{ id: number }>()
);
export const setPrimaryLocalizationSuccess = createAction(
    '[SettingsMyAccountComponent] Set Primary Localization Success',
    props<{ id: number }>()
);
export const setPrimaryLocalizationError = createAction(
    '[SettingsMyAccountComponent] Set Primary Localization Error',
    props<{ error: string }>()
);
