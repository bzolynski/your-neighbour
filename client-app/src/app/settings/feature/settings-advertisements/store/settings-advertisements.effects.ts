import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MessageService } from 'primeng/api';
import { of, throwError } from 'rxjs';
import { catchError, filter, map, switchMap, tap } from 'rxjs/operators';
import { AdvertisementService } from '@core/services/.';
import { User } from '@core/models/';
import {
    addToList,
    addToListError,
    addToListSuccess,
    deleteAdvertisement,
    deleteAdvertisementError,
    deleteAdvertisementSuccess,
    loadAdvertisements,
    loadAdvertisementsError,
    loadAdvertisementsSuccess,
    updateOnList,
    updateOnListError,
    updateOnListSuccess,
} from './settings-advertisements.actions';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectUser } from '@core/stores/authentication';

@Injectable()
export class SettingsMyAdvertisementsEffects {
    user$: Observable<User | null> = this.store.select(selectUser);
    constructor(
        private actions$: Actions,
        private advertisementService: AdvertisementService,
        private store: Store,
        private messageService: MessageService,
        private router: Router
    ) {}

    loadAdvertisements$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadAdvertisements),
            switchMap(() =>
                this.user$.pipe(
                    tap(this.checkUserLoggedIn),
                    filter((user): user is User => user !== null),
                    switchMap((user) =>
                        this.advertisementService.getManyByUser(user.id, {
                            includeCategory: true,
                            includeLocalization: true,
                            includeImages: true,
                            maxImages: 1,
                        })
                    ),
                    map((advertisements) => loadAdvertisementsSuccess({ advertisements: advertisements })),
                    catchError((error: HttpErrorResponse) => of(loadAdvertisementsError({ error: error.error ?? error.message })))
                )
            )
        )
    );

    addToList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addToList),
            switchMap(({ id }) =>
                this.advertisementService.get(id, {
                    includeCategory: true,
                    includeLocalization: true,
                    includeImages: true,
                    maxImages: 1,
                })
            ),
            map((advertisement) => addToListSuccess({ advertisement: advertisement })),
            catchError((error: HttpErrorResponse) => of(addToListError({ error: error.error ?? error.message })))
        )
    );

    updateOnList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateOnList),
            switchMap(({ id }) =>
                this.advertisementService.get(id, {
                    includeCategory: true,
                    includeLocalization: true,
                    includeImages: true,
                    maxImages: 1,
                })
            ),
            map((advertisement) => updateOnListSuccess({ advertisement: advertisement })),
            catchError((error: HttpErrorResponse) => of(updateOnListError({ error: error.error ?? error.message })))
        )
    );

    deleteAdvertisement$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteAdvertisement),
            switchMap(({ id }) =>
                this.advertisementService.delete(id).pipe(
                    map(() => deleteAdvertisementSuccess({ id })),
                    catchError((error: HttpErrorResponse) =>
                        of(deleteAdvertisementError({ error: error.error ?? error.message }))
                    )
                )
            )
        )
    );

    private checkUserLoggedIn = (user: User | null) => {
        if (user === null) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Nie jesteś zalogowany' });
            this.router.navigate(['welcome'], { queryParams: { returnUrl: this.router.routerState.snapshot.url } });

            throwError(new Error('User is not logged in'));
        }
    };
}
