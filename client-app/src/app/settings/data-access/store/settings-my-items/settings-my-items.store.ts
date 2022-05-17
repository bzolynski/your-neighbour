import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { ListViewType } from 'src/app/shared/ui/list-container/list-container.component';

interface SettingsMyItemsState {
    listViewType: ListViewType;
}

@Injectable()
export class SettingsMyItemsStore extends ComponentStore<SettingsMyItemsState> {
    readonly listViewType$ = this.select((state) => state.listViewType);

    readonly changeListViewType = this.updater((state, listViewType: ListViewType) => {
        return { ...state, listViewType: listViewType };
    });
    constructor() {
        super({ listViewType: 'list' } as SettingsMyItemsState);
    }
}
