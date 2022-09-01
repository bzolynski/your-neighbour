import { createAction, props } from '@ngrx/store';
import { Category } from '@models/';

export const loadCategory = createAction('[SettingsCategoriesDetailsComponent] Load Category', props<{ id: number }>());
export const loadCategorySuccess = createAction(
    '[SettingsCategoriesDetailsComponent] Load Category Success',
    props<{ category: Category }>()
);
export const loadCategoryError = createAction(
    '[SettingsCategoriesDetailsComponent] Load Category Error',
    props<{ error: string }>()
);
export const deleteCategory = createAction('[SettingsCategoriesDetailsComponent] Delete Category', props<{ id: number }>());
export const deleteCategorySuccess = createAction(
    '[SettingsCategoriesDetailsComponent] Delete Category Success',
    props<{ id: number }>()
);
export const deleteCategoryError = createAction(
    '[SettingsCategoriesDetailsComponent] Delete Category Error',
    props<{ error: string }>()
);
export const resetState = createAction('[SettingsCategoriesDetailsComponent] Reset State');
