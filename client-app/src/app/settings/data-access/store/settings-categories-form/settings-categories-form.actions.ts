import { createAction, props } from '@ngrx/store';
import { CategoryDefinition, Category } from '@models/';

export const resetState = createAction('[SettingsCategoriesFormComponent] Reset State');

export const loadCategory = createAction('[SettingsCategoriesFormComponent] Load Category', props<{ id: number }>());
export const loadCategorySuccess = createAction(
    '[SettingsCategoriesFormComponent] Load Category Success',
    props<{ category: Category }>()
);
export const loadCategoryError = createAction(
    '[SettingsCategoriesFormComponent] Load Category Error',
    props<{ error: string }>()
);

export const loadDefinitions = createAction('[SettingsCategoriesFormComponent] Load Definitions');
export const loadDefinitionsSuccess = createAction(
    '[SettingsCategoriesFormComponent] Load Definitions Success',
    props<{ definitions: CategoryDefinition[] }>()
);
export const loadDefinitionsError = createAction(
    '[SettingsCategoriesFormComponent] Load Definitions Error',
    props<{ error: string }>()
);

export const updateCategory = createAction(
    '[SettingsCategoriesFormComponent] Update Category',
    props<{ id: number; category: Category }>()
);
export const updateCategorySuccess = createAction(
    '[SettingsCategoriesFormComponent] Update Category Success',
    props<{ category: Category }>()
);
export const updateCategoryError = createAction(
    '[SettingsCategoriesFormComponent] Update Category Error',
    props<{ error: string }>()
);

export const createCategory = createAction('[SettingsCategoriesFormComponent] Create Category', props<{ category: Category }>());
export const createCategorySuccess = createAction(
    '[SettingsCategoriesFormComponent] Create Category Success',
    props<{ category: Category }>()
);
export const createCategoryError = createAction(
    '[SettingsCategoriesFormComponent] Create Category Error',
    props<{ error: string }>()
);
