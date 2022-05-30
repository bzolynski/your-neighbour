import { createAction, props } from '@ngrx/store';
import { ICategory } from 'src/app/shared/data-access/models';

export const loadCategory = createAction('[SettingsCategoriesDetailsComponent] Load Category', props<{ id: number }>());
export const loadCategorySuccess = createAction(
    '[SettingsCategoriesDetailsComponent] Load Category Success',
    props<{ category: ICategory }>()
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
