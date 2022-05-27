import { createAction, props } from '@ngrx/store';
import { ICategory } from 'src/app/shared/data-access/models';

export const loadCategories = createAction('[SettingsCategoriesComponent] Load Categories');
export const loadCategoriesSuccess = createAction(
    '[SettingsCategoriesComponent] Load Categories Success',
    props<{ categories: ICategory[] }>()
);
export const loadCategoriesError = createAction(
    '[SettingsCategoriesComponent] Load Categories Error',
    props<{ error: string }>()
);
