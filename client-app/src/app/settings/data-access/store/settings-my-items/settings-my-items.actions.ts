import { createAction, props } from '@ngrx/store';
import { IImage, IItem } from 'src/app/shared/data-access/models';
import { ListViewType } from 'src/app/shared/ui/list-container/list-container.component';

export const loadItems = createAction('[SettingsMyItemsComponent] Load Items');
export const loadItemsSuccess = createAction('[SettingsMyItemsComponent] Load Items Success', props<{ items: IItem[] }>());
export const loadItemsError = createAction('[SettingsMyItemsComponent] Load Items Error', props<{ error: string }>());
export const deleteItem = createAction('[SettingsMyItemsComponent] Delete Item', props<{ id: number }>());
export const deleteItemSuccess = createAction('[SettingsMyItemsComponent] Delete Item Success', props<{ id: number }>());
export const deleteItemError = createAction('[SettingsMyItemsComponent] Delete Item Error', props<{ error: string }>());

export const loadImages = createAction('[SettingsMyItemsComponent] Load Images', props<{ itemId: number }>());
export const loadImagesSuccess = createAction(
    '[SettingsMyItemsComponent] Load Images Success',
    props<{ itemId: number; images: IImage[] }>()
);
export const loadImagesError = createAction('[SettingsMyItemsComponent] Load Images Error', props<{ error: string }>());
export const changeListViewType = createAction(
    '[SettingsMyItemsComponent] Change List View Type',
    props<{ listViewType: ListViewType }>()
);
