import { createAction, props } from '@ngrx/store';
import { ICategory, IImage, IItem } from 'src/app/shared/data-access/models';

export const loadItem = createAction('[SettingsMyItemsFormComponent] Load Item', props<{ id: number }>());
export const loadItemSuccess = createAction('[SettingsMyItemsFormComponent] Load Item Success', props<{ item: IItem }>());
export const loadItemError = createAction('[SettingsMyItemsFormComponent] Load Item Error', props<{ error: string }>());

// export const loadImages = createAction('[SettingsMyItemsFormComponent] Load Images');
export const loadImagesSuccess = createAction(
    '[SettingsMyItemsFormComponent] Load Images Success',
    props<{ images: IImage[] }>()
);
export const loadImagesError = createAction('[SettingsMyItemsFormComponent] Load Images Error', props<{ error: string }>());

export const loadCategories = createAction('[SettingsMyItemsComponent] Load Categories');
export const loadCategoriesSuccess = createAction(
    '[SettingsMyItemsComponent] Load Categories Success',
    props<{ categories: ICategory[] }>()
);
export const loadCategoriesError = createAction('[SettingsMyItemsComponent] Load Categories Error', props<{ error: string }>());
export const createItem = createAction('[SettingsMyItemsFormComponent] Create Item', props<{ item: IItem }>());
export const createItemSuccess = createAction('[SettingsMyItemsFormComponent] Create Item Success', props<{ item: IItem }>());
export const createItemError = createAction('[SettingsMyItemsFormComponent] Create Item Error', props<{ error: string }>());

export const updateItem = createAction('[SettingsMyItemsFormComponent] Update Item', props<{ id: number; item: IItem }>());
export const updateItemSuccess = createAction('[SettingsMyItemsFormComponent] Update Item Success', props<{ item: IItem }>());
export const updateItemError = createAction('[SettingsMyItemsFormComponent] Update Item Error', props<{ error: string }>());

export const resetState = createAction('[SettingsMyItemsFormComponent] Reset State');
export const closeForm = createAction('[SettingsMyItemsFormComponent] Close Form');
