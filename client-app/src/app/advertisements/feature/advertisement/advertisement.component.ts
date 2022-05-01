import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { MessageService } from 'src/app/modules/core/services/message.service';
import { AdvertisementStore } from '../../data-access';

@Component({
    selector: 'app-advertisement',
    templateUrl: './advertisement.component.html',
    styleUrls: ['./advertisement.component.scss'],
    providers: [AdvertisementStore],
})
export class AdvertisementComponent implements OnInit {
    advertisement$ = this.advertisementStore.advertisement$.pipe(
        tap((x) => {
            console.log(x);
        })
    );
    isLoading$ = this.advertisementStore.isLoading$;
    error$ = this.advertisementStore.error$.pipe(tap((error) => this.messageService.showMessage(error, 'error')));

    constructor(
        private route: ActivatedRoute,
        private advertisementStore: AdvertisementStore,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        this.advertisementStore.loadAdvertisement(this.route.params.pipe(map((params) => +params['id'])));
    }
}
