import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    selectedListViewType$ = this.advertisementListStore.listViewType$;
    activeCategory$ = this.advertisementListStore.activeCategory$;

    ngOnInit(): void {
        this.advertisementListStore.loadCategoryAndAdvertisements(RoutingHelperMethods.combineParams(this.route));
    }
    openAdvertisement = (id: number) => {
        this.router.navigate(['advertisements', 'details', id]);
    };
}
