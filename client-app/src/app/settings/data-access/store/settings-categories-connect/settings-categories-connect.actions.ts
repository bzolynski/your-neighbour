import { createAction, props } from '@ngrx/store';
import { ITree } from 'src/app/modules/tree-view/models';
import { ICategory } from 'src/app/shared/data-access/models';

export const resetState = createAction('[SettingsCategoriesConnectComponent] Reset State');

export const loadTree = createAction('[SettingsCategoriesConnectComponent] Load Tree');
export const loadTreeSuccess = createAction(
    '[SettingsCategoriesConnectComponent] Load Tree Success',
    props<{ tree: ITree<ICategory> }>()
);
export const loadTreeError = createAction('[SettingsCategoriesConnectComponent] Load Tree Error', props<{ error: string }>());

export const loadUnasignedCategories = createAction('[SettingsCategoriesConnectComponent] Load Unasigned Categories');
export const loadUnasignedCategoriesSuccess = createAction(
    '[SettingsCategoriesConnectComponent] Load Unasigned Categories Success',
    props<{ categories: ICategory[] }>()
);
export const loadUnasignedCategoriesError = createAction(
    '[SettingsCategoriesConnectComponent] Load Unasigned Categories Error',
    props<{ error: string }>()
);
