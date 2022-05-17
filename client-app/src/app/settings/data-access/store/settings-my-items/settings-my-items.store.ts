import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { filter } from 'rxjs/operators';
import { ListViewType } from 'src/app/shared/ui/list-container/list-container.component';

interface SettingsMyItemsState {
    listViewType: ListViewType;
}

@Injectable()
export class SettingsMyItemsStore extends ComponentStore<SettingsMyItemsState> {
    readonly listViewType$ = this.select((state) => state.listViewType).pipe(
        filter((viewType): viewType is ListViewType => viewType != null)
    );

    readonly changeListViewType = this.updater((state, listViewType: ListViewType) => {
        return { ...state, listViewType: listViewType };
    });
    constructor() {
        super({ listViewType: 'list' } as SettingsMyItemsState);
    }
}
