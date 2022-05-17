import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { ListViewType } from 'src/app/shared/ui/list-container/list-container.component';

interface SettingsMyAdvertisementsState {
    listViewType: ListViewType;
}

@Injectable()
export class SettingsMyAdvertisementsStore extends ComponentStore<SettingsMyAdvertisementsState> {
    readonly listViewType$ = this.select((state) => state.listViewType);

    readonly changeListViewType = this.updater((state, listViewType: ListViewType) => {
        return { ...state, listViewType: listViewType };
    });

    constructor() {
        super({ listViewType: 'list' } as SettingsMyAdvertisementsState);
    }
}
