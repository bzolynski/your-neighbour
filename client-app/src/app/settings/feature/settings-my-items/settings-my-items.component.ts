import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ICategory, IItem } from 'src/app/shared/data-access/models';
import { ItemStore } from 'src/app/shared/data-access/store';
import { ListViewType } from 'src/app/shared/ui/list-container/list-container.component';
import { SettingsMyItemsStore } from '../../data-access';

@Component({
    selector: 'app-settings-my-items',
    templateUrl: './settings-my-items.component.html',
    styleUrls: ['./settings-my-items.component.scss'],
    providers: [SettingsMyItemsStore, ItemStore],
})
export class SettingsMyItemsComponent implements OnInit {
    items$: Observable<IItem[] | null> = this.itemStore.items$;
    selectedListViewType$: Observable<ListViewType> = this.settingsItemStore.listViewType$.pipe(
        filter((viewType): viewType is ListViewType => viewType != null)
    );
    categories$: Observable<ICategory[] | null> = this.settingsItemStore.categories$;
    constructor(private settingsItemStore: SettingsMyItemsStore, private itemStore: ItemStore, public dialog: MatDialog) {}

    ngOnInit(): void {
        this.itemStore.loadForLoggedInUser({ itemQuery: { includeCategory: true }, imageQuery: { maxImages: 1 } });
        this.settingsItemStore.loadCategories();
    }

    changeListViewType = (listViewType: ListViewType) => {
        this.settingsItemStore.changeListViewType(listViewType);
    };

    filterItems = (query: string) => {
        // this.settingsItemStore.filterItems(query);
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
}
