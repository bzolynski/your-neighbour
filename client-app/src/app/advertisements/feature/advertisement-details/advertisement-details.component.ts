import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { filter, map, takeUntil, tap } from 'rxjs/operators';
import { MessageService } from 'src/app/modules/core/services/message.service';
import {} from 'src/app/settings/data-access/store/settings-my-account';
import { DestroyObservable } from 'src/app/shared/utils/destroy-observable';
import {
    loadAdvertisement,
    selectAdvertisement,
    selectError,
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
    #error$ = this.store.select(selectError);

    vm$ = combineLatest([this.#advertisement$, this.#user$, this.#error$, this.#status$]).pipe(
        map(([advertisement, user, error, status]) => ({ advertisement, user, error, status }))
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
        this.#error$.pipe(
            filter((error): error is string => error !== null),
            tap((error) => this.messageService.showMessage(error, 'error'))
        );
    }
}
