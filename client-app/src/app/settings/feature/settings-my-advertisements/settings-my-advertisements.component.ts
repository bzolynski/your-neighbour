import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Advertisement } from 'src/app/advertisements/data-access/models/advertisement.model';
import { ListViewType } from 'src/app/shared/ui/list-container/list-container.component';
import { SettingsMyAdvertisementsStore } from '../../data-access/store/settings-my-advertisements';

@Component({
    selector: 'app-settings-my-advertisements',
    templateUrl: './settings-my-advertisements.component.html',
    styleUrls: ['./settings-my-advertisements.component.scss'],
    providers: [SettingsMyAdvertisementsStore],
})
export class SettingsMyAdvertisementsComponent implements OnInit {
    advertisements$: Observable<Advertisement[] | null> = this.settingsAdvertisementStore.advertisements$;

    selectedListViewType$: Observable<ListViewType> = this.settingsAdvertisementStore.listViewType$.pipe(
        filter((viewType): viewType is ListViewType => viewType != null)
    );
    constructor(private settingsAdvertisementStore: SettingsMyAdvertisementsStore, public dialog: MatDialog) {}

    ngOnInit(): void {
        this.settingsAdvertisementStore.loadAdvertisements();
    }

    changeListViewType = (listViewType: ListViewType) => {
        this.settingsAdvertisementStore.changeListViewType(listViewType);
    };

    deleteAdvertisement = (id: number) => {
        this.settingsAdvertisementStore.delete(id);
    };
}
