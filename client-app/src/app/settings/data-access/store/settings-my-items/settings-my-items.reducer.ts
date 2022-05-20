import { createReducer, on } from '@ngrx/store';
import { GenericState, IItem } from 'src/app/shared/data-access/models';
import { ListViewType } from 'src/app/shared/ui/list-container/list-container.component';
import { createItemSuccess, updateItemSuccess } from '../settings-my-items-form';
import {
    changeListViewType,
    deleteItem,
    deleteItemError,
    deleteItemSuccess,
    loadImagesError,
    loadImagesSuccess,
    loadItems,
    loadItemsError,
    loadItemsSuccess,
} from './settings-my-items.actions';

export const SETTINGS_MY_ITEM_STATE_FEATURE_KEY = 'settings my items';

export interface SettingsMyItemsState extends GenericState<IItem[]> {
    listViewType: ListViewType;
}

export const initialState: SettingsMyItemsState = {
    error: null,
    status: 'pending',
    listViewType: 'list',
    data: [],
};

export const settingsMyItemsReducer = createReducer(
    initialState,
    on(loadItems, (state) => ({
        ...state,
        status: 'loading',
        error: null,
    })),
    on(loadItemsSuccess, (state, { items }) => ({
        ...state,
        status: 'success',
        data: items,
    })),
    on(loadItemsError, (state, { error }) => ({
        ...state,
        status: 'error',
        error: error,
    })),
    on(deleteItem, (state) => ({
        ...state,
        status: 'loading',
        error: null,
    })),
    on(deleteItemSuccess, (state, { id }) => ({
        ...state,
        status: 'success',
        data: (state.data ?? []).filter((value) => value.id !== id),
    })),
    on(deleteItemError, (state, { error }) => ({
        ...state,
        status: 'error',
        error: error,
    })),
    on(changeListViewType, (state, { listViewType }) => ({
        ...state,
        listViewType: listViewType,
    })),
    on(loadImagesSuccess, (state, { itemId, images }) => ({
        ...state,
        status: 'success',
        data: (state.data ?? []).map((value) => (value.id === itemId ? ({ ...value, images: images } as IItem) : value)),
    })),
    on(loadImagesError, (state, { error }) => ({
        ...state,
        status: 'error',
        error: error,
    })),
    on(updateItemSuccess, (state, { item }) => ({
        ...state,
        data: (state.data ?? []).map((value) => (value.id === item.id ? { ...value, ...item } : value)),
    })),
    on(createItemSuccess, (state, { item }) => ({
        ...state,
        data: [...(state.data ?? []), item],
    }))
);
