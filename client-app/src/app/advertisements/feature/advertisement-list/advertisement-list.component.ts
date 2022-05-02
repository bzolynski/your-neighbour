import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdvertisementListStore } from '../../data-access/store/advertisement-list';

@Component({
    selector: 'app-advertisement-list',
    templateUrl: './advertisement-list.component.html',
    styleUrls: ['./advertisement-list.component.scss'],
    providers: [AdvertisementListStore],
})
export class AdvertisementListComponent implements OnInit {
    constructor(private advertisementListStore: AdvertisementListStore, private router: Router) {}

    advertisements$ = this.advertisementListStore.advertisements$;
    ngOnInit(): void {
        this.advertisementListStore.loadAdvertisements();
    }
    openAdvertisement = (id: number) => {
        this.router.navigate(['advertisements', id]);
    };
}
