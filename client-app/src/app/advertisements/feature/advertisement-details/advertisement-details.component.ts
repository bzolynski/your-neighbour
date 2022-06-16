import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
import { MessageService } from 'src/app/modules/core/services/message.service';
import { DestroyObservable } from 'src/app/shared/utils/destroy-observable';
import {
    addFavorite,
    deleteFavorite,
    loadAdvertisement,
    resetState,
    selectAdvertisement,
    selectError,
    selectIsFavorite,
    selectIsOwner,
    selectStatus,
    selectUser,
} from '../../data-access/store/advertisement-details';

@Component({
    selector: 'app-advertisement-details',
    templateUrl: './advertisement-details.component.html',
    styleUrls: ['./advertisement-details.component.scss'],
    providers: [DestroyObservable],
})
export class AdvertisementDetailsComponent implements OnInit, OnDestroy {
    #advertisement$ = this.store.select(selectAdvertisement);
    #user$ = this.store.select(selectUser);
    #status$ = this.store.select(selectStatus);
    #error$ = this.store
        .select(selectError)
        .pipe(tap((error) => (error ? this.messageService.showMessage(error, 'error') : undefined)));
    #isFavorite$ = this.store.select(selectIsFavorite);
    #isOwner$ = this.store.select(selectIsOwner);

    vm$ = combineLatest([this.#advertisement$, this.#user$, this.#isFavorite$, this.#isOwner$, this.#error$, this.#status$]).pipe(
        map(([advertisement, user, isFavorite, isOwner, error, status]) => ({
            advertisement,
            user,
            isFavorite,
            isOwner,
            error,
            status,
        }))
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
    ngOnDestroy(): void {
        this.store.dispatch(resetState());
    }
    addFavorite = (advertisementId: number) => {
        this.store.dispatch(addFavorite({ advertisementId: advertisementId }));
    };

    removeFavorite = (advertisementId: number) => {
        this.store.dispatch(deleteFavorite({ advertisementId: advertisementId }));
    };
}
