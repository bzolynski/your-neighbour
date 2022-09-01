import { createAction, props } from '@ngrx/store';
import { CategoryDefinition } from '@models/';

export const loadDefinitions = createAction('[SettingsCategoryDefinitionsComponent] Load Definitions');
export const loadDefinitionsSuccess = createAction(
    '[SettingsCategoryDefinitionsComponent] Load Definitions Success',
    props<{ definitions: CategoryDefinition[] }>()
);
export const loadDefinitionsError = createAction(
    '[SettingsCategoryDefinitionsComponent] Load Definitions Error',
    props<{ error: string }>()
);
