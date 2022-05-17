import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { ICategory, IItem } from 'src/app/shared/data-access/models';
import { CategoryStore, ItemStore } from 'src/app/shared/data-access/store';
import { ListViewType } from 'src/app/shared/ui/list-container/list-container.component';
import { SettingsMyItemsStore } from '../../data-access';

@Component({
    selector: 'app-settings-my-items',
    templateUrl: './settings-my-items.component.html',
    styleUrls: ['./settings-my-items.component.scss'],
    providers: [SettingsMyItemsStore, ItemStore, CategoryStore],
})
export class SettingsMyItemsComponent implements OnInit {
    selectedListViewType$: Observable<ListViewType> = this.settingsItemStore.listViewType$.pipe(
        filter((viewType): viewType is ListViewType => viewType != null)
    );
    categories$: Observable<ICategory[] | null> = this.categoryStore.categories$;

    filter$: BehaviorSubject<string> = new BehaviorSubject('');
    filteredItems$ = this.filter$
        .asObservable()
        .pipe(
            switchMap((search) =>
                this.itemStore.items$.pipe(
                    map((items) => items?.filter((value) => value.name.toUpperCase().includes(search.toUpperCase())))
                )
            )
        );
    constructor(
        private settingsItemStore: SettingsMyItemsStore,
        private itemStore: ItemStore,
        private categoryStore: CategoryStore,
        public dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.itemStore.loadForLoggedInUser({ includeCategory: true });
        this.categoryStore.loadCategories();
    }

    changeListViewType = (listViewType: ListViewType) => {
        this.settingsItemStore.changeListViewType(listViewType);
    };

    deleteItem = (id: number) => {
        this.itemStore.delete(id);
    };

    itemFormSubmited = (id: number | undefined, form: FormGroup) => {
        console.log(form.valid);

        if (form.valid) {
            const item: IItem = { ...form.value };
            if (id) {
                this.itemStore.update({
                    id: id,
                    item: item,
                });
            } else {
                this.itemStore.create(item);
            }
            this.dialog.closeAll();
        }
    };

    loadImages = (item: IItem) => {
        this.itemStore.loadImages({ id: item.id, queryParams: { maxImages: 1 } });
    };
}
