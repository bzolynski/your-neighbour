import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
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
        this.advertisementListStore.loadCategoryAndAdvertisements(this.route.params.pipe(map((params) => params['id'])));
    }
    openAdvertisement = (id: number) => {
        this.router.navigate(['advertisements', 'details', id]);
    };
}
