import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Advertisement } from 'src/app/advertisements/data-access/models/advertisement.model';
import { ListViewType } from 'src/app/shared/ui/list-container/list-container.component';
import {
    changeListViewType,
    deleteAdvertisement,
    loadAdvertisements,
    loadImages,
    selectAdvertisements,
    selectListViewType,
} from '../../data-access/store/settings-my-advertisements';

@Component({
    selector: 'app-settings-my-advertisements',
    templateUrl: './settings-my-advertisements.component.html',
    styleUrls: ['./settings-my-advertisements.component.scss'],
})
export class SettingsMyAdvertisementsComponent implements OnInit {
    advertisements$: Observable<Advertisement[] | null> = this.store.select(selectAdvertisements);

    selectedListViewType$: Observable<ListViewType> = this.store.select(selectListViewType);
    constructor(public dialog: MatDialog, private store: Store) {}

    ngOnInit(): void {
        this.store.dispatch(loadAdvertisements());
    }

    changeListViewType = (listViewType: ListViewType) => {
        this.store.dispatch(changeListViewType({ listViewType }));
    };

    deleteAdvertisement = (id: number) => {
        this.store.dispatch(deleteAdvertisement({ id }));
    };

    loadImages = (advertisement: Advertisement) => {
        this.store.dispatch(loadImages({ itemId: advertisement.item.id }));
    };
}
