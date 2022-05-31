import { createAction, props } from '@ngrx/store';
import { ICategoryDefinition } from 'src/app/shared/data-access/models';

export const resetState = createAction('[SettingsCategoryDefinitionsFormComponent] Reset State');

export const loadDefinition = createAction('[SettingsCategoryDefinitionsFormComponent] Load Definition', props<{ id: number }>());
export const loadDefinitionSuccess = createAction(
    '[SettingsCategoryDefinitionsFormComponent] Load Definition Success',
    props<{ definiton: ICategoryDefinition }>()
);
export const loadDefinitionError = createAction(
    '[SettingsCategoryDefinitionsFormComponent] Load Definition Error',
    props<{ error: string }>()
);

export const updateDefinition = createAction(
    '[SettingsCategoryDefinitionsFormComponent] Update Definition',
    props<{ id: number; definiton: ICategoryDefinition }>()
);
export const updateDefinitionSuccess = createAction(
    '[SettingsCategoryDefinitionsFormComponent] Update Definition Success',
    props<{ definiton: ICategoryDefinition }>()
);
export const updateDefinitionError = createAction(
    '[SettingsCategoryDefinitionsFormComponent] Update Definition Error',
    props<{ error: string }>()
);

export const createDefinition = createAction(
    '[SettingsCategoryDefinitionsFormComponent] Create Definition',
    props<{ definiton: ICategoryDefinition }>()
);
export const createDefinitionSuccess = createAction(
    '[SettingsCategoryDefinitionsFormComponent] Create Definition Success',
    props<{ definiton: ICategoryDefinition }>()
);
export const createDefinitionError = createAction(
    '[SettingsCategoryDefinitionsFormComponent] Create Definition Error',
    props<{ error: string }>()
);
