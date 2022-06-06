import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
import { MessageService } from 'src/app/modules/core/services/message.service';
import {} from 'src/app/settings/data-access/store/settings-my-account';
import { DestroyObservable } from 'src/app/shared/utils/destroy-observable';
import {
    addFavorite,
    deleteFavorite,
    loadAdvertisement,
    selectAdvertisement,
    selectError,
    selectIsFavorite,
    selectStatus,
    selectUser,
} from '../../data-access/store/advertisement-details';

@Component({
    selector: 'app-advertisement-details',
    templateUrl: './advertisement-details.component.html',
    styleUrls: ['./advertisement-details.component.scss'],
    providers: [DestroyObservable],
})
export class AdvertisementDetailsComponent implements OnInit {
    #advertisement$ = this.store.select(selectAdvertisement);
    #user$ = this.store.select(selectUser);
    #status$ = this.store.select(selectStatus);
    #error$ = this.store
        .select(selectError)
        .pipe(tap((error) => (error ? this.messageService.showMessage(error, 'error') : undefined)));
    #isFavorite$ = this.store.select(selectIsFavorite);

    vm$ = combineLatest([this.#advertisement$, this.#user$, this.#isFavorite$, this.#error$, this.#status$]).pipe(
        map(([advertisement, user, isFavorite, error, status]) => ({ advertisement, user, isFavorite, error, status }))
    );

    constructor(
        private route: ActivatedRoute,
        private store: Store,
        private messageService: MessageService,
        private destroy$: DestroyObservable
    ) {}

    ngOnInit(): void {
        this.route.params
            .pipe(
                takeUntil(this.destroy$),
                tap((params) => this.store.dispatch(loadAdvertisement({ id: +params['id'] })))
            )
            .subscribe();
    }
    addFavorite = (advertisementId: number) => {
        this.store.dispatch(addFavorite({ advertisementId: advertisementId }));
    };

    removeFavorite = (advertisementId: number) => {
        this.store.dispatch(deleteFavorite({ advertisementId: advertisementId }));
    };
}
