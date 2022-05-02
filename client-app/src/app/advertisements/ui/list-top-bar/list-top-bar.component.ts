import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AdvertisementListStore, ListViewType } from '../../data-access';

@Component({
    selector: 'app-list-top-bar',
    templateUrl: './list-top-bar.component.html',
    styleUrls: ['./list-top-bar.component.scss'],
})
export class ListTopBarComponent {
    selectedListViewType$: Observable<ListViewType> = this.advertisementListStore.listViewType$;
    constructor(private advertisementListStore: AdvertisementListStore) {}

    changeListViewType = (listViewType: ListViewType) => {
        this.advertisementListStore.changeListViewType(listViewType);
    };
}
