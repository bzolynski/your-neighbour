import { createAction, props } from '@ngrx/store';
import { CategoryDefinition } from '@models/';

export const loadDefinition = createAction(
    '[SettingsCategoryDefinitionsDetailsComponent] Load Definition',
    props<{ id: number }>()
);
export const loadDefinitionSuccess = createAction(
    '[SettingsCategoryDefinitionsDetailsComponent] Load Definition Success',
    props<{ definition: CategoryDefinition }>()
);
export const loadDefinitionError = createAction(
    '[SettingsCategoryDefinitionsDetailsComponent] Load Definition Error',
    props<{ error: string }>()
);

export const deleteDefinition = createAction(
    '[SettingsCategoryDefinitionsDetailsComponent] Delete Definition',
    props<{ id: number }>()
);
export const deleteDefinitionSuccess = createAction(
    '[SettingsCategoryDefinitionsDetailsComponent] Delete Definition Success',
    props<{ id: number }>()
);
export const deleteDefinitionError = createAction(
    '[SettingsCategoryDefinitionsDetailsComponent] Delete Definition Error',
    props<{ error: string }>()
);
export const resetState = createAction('[SettingsCategoryDefinitionsDetailsComponent] Reset State');
