import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { IItem } from 'src/app/shared/data-access/models';
import { CategoryStore } from 'src/app/shared/data-access/store';
import { ItemStore } from 'src/app/shared/data-access/store/item.store';
import { ListViewType } from 'src/app/shared/ui/list-container/list-container.component';

interface SettingsMyItemsState {
    listViewType: ListViewType;
    filteredItems: IItem[];
}

@Injectable()
export class SettingsMyItemsStore extends ComponentStore<SettingsMyItemsState> {
    readonly items$ = this.itemStore.items$.pipe(
        filter((items): items is IItem[] => items !== null),
        tap((items) => this.patchState({ filteredItems: items }))
    );
    readonly isLoading$ = this.itemStore.isLoading$;
    readonly error$ = this.itemStore.error$;

    readonly categories$ = this.categoryStore.categories$;
    readonly filteredItems$ = this.select((state) => state.filteredItems);
    readonly listViewType$ = this.select((state) => state.listViewType);

    readonly loadCategories = this.categoryStore.loadCategories;
    readonly createItem = this.itemStore.createAndGet;

    readonly loadItems = () =>
        this.itemStore.loadItemsForLoggedInUser({ includeImages: true, maxImages: 1, includeCategory: true });

    readonly changeListViewType = this.updater((state, listViewType: ListViewType) => {
        return { ...state, listViewType: listViewType };
    });

    readonly filterItems = this.effect<string>((params$) =>
        params$.pipe(
            switchMap((query) =>
                this.items$.pipe(map((items) => items?.filter((item) => item.name.toUpperCase().includes(query.toUpperCase()))))
            ),
            tap((items) => {
                console.log(items);

                this.patchState({ filteredItems: items });
            })
        )
    );
    constructor(private itemStore: ItemStore, private categoryStore: CategoryStore) {
        super({ listViewType: 'list' } as SettingsMyItemsState);
    }
}
