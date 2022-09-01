import { createAction, props } from '@ngrx/store';
import { Category } from '@models/';

export const loadCategories = createAction('[SettingsCategoriesComponent] Load Categories');
export const loadCategoriesSuccess = createAction(
    '[SettingsCategoriesComponent] Load Categories Success',
    props<{ categories: Category[] }>()
);
export const loadCategoriesError = createAction(
    '[SettingsCategoriesComponent] Load Categories Error',
    props<{ error: string }>()
);
export const setSidePanelWitdh = createAction('[SettingsCategoriesComponent] Set Side Panel Width', props<{ width: string }>());
