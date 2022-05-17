import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Advertisement } from 'src/app/advertisements/data-access/models/advertisement.model';
import { AdvertisementsStore } from 'src/app/shared/data-access/store/advertisements.store';
import { ListViewType } from 'src/app/shared/ui/list-container/list-container.component';
import { SettingsMyAdvertisementsStore } from '../../data-access/store/settings-my-advertisements';

@Component({
    selector: 'app-settings-my-advertisements',
    templateUrl: './settings-my-advertisements.component.html',
    styleUrls: ['./settings-my-advertisements.component.scss'],
    providers: [SettingsMyAdvertisementsStore, AdvertisementsStore],
})
export class SettingsMyAdvertisementsComponent implements OnInit {
    advertisements$: Observable<Advertisement[] | null> = this.advertisementsStore.advertisements$;

    selectedListViewType$: Observable<ListViewType> = this.settingsAdvertisementStore.listViewType$.pipe(
        filter((viewType): viewType is ListViewType => viewType != null)
    );
    constructor(
        private advertisementsStore: AdvertisementsStore,
        private settingsAdvertisementStore: SettingsMyAdvertisementsStore,
        public dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.advertisementsStore.loadByUser({ includeCategory: true, includeLocalization: true, includeItem: true });
    }

    changeListViewType = (listViewType: ListViewType) => {
        this.settingsAdvertisementStore.changeListViewType(listViewType);
    };

    deleteAdvertisement = (id: number) => {
        this.advertisementsStore.delete(id);
    };

    loadImages = (advertisement: Advertisement) => {
        this.advertisementsStore.loadImages({ id: advertisement.item.id, queryParams: { maxImages: 1 } });
    };
}
