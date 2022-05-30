import { createAction, props } from '@ngrx/store';
import { ICategoryDefinition } from 'src/app/shared/data-access/models';

export const loadDefinitions = createAction('[SettingsCategoryDefinitionsComponent] Load Definitions');
export const loadDefinitionsSuccess = createAction(
    '[SettingsCategoryDefinitionsComponent] Load Definitions Success',
    props<{ definitions: ICategoryDefinition[] }>()
);
export const loadDefinitionsError = createAction(
    '[SettingsCategoryDefinitionsComponent] Load Definitions Error',
    props<{ error: string }>()
);
