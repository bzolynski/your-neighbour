import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ListViewType } from 'src/app/shared/ui/list-container/list-container.component';
import { RoutingHelperMethods } from 'src/app/shared/utils';
import { AdvertisementListStore } from '../../data-access/store/advertisement-list';

@Component({
    selector: 'app-advertisement-list',
    templateUrl: './advertisement-list.component.html',
    styleUrls: ['./advertisement-list.component.scss'],
    providers: [AdvertisementListStore],
})
export class AdvertisementListComponent implements OnInit {
    constructor(private advertisementListStore: AdvertisementListStore, private router: Router, private route: ActivatedRoute) {}

    advertisements$ = this.advertisementListStore.advertisements$;
    selectedListViewType$: Observable<ListViewType> = this.advertisementListStore.listViewType$.pipe(
        filter((viewType): viewType is ListViewType => viewType != null)
    );
    activeCategory$ = this.advertisementListStore.activeCategory$;

    ngOnInit(): void {
        this.advertisementListStore.loadCategoryAndAdvertisements(RoutingHelperMethods.combineParams(this.route));
    }
    openAdvertisement = (id: number) => {
        this.router.navigate(['advertisements', 'details', id]);
    };
}
