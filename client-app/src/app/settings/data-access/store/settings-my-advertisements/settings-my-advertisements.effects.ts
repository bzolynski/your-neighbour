import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MessageService } from 'primeng/api';
import { of, throwError } from 'rxjs';
import { catchError, filter, map, switchMap, tap } from 'rxjs/operators';
import { AdvertisementService } from '@services/.';
import { User } from '@models/';
import {
    createAdvertisement,
    deleteAdvertisement,
    deleteAdvertisementError,
    deleteAdvertisementSuccess,
    loadAdvertisements,
    loadAdvertisementsError,
    loadAdvertisementsSuccess,
    updateAdvertisement,
    updateAdvertisementError,
    updateAdvertisementSuccess,
} from './settings-my-advertisements.actions';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectUser } from '@stores/authentication';

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
                        })
                    ),
                    map((advertisements) => loadAdvertisementsSuccess({ advertisements: advertisements })),
                    catchError((error: HttpErrorResponse) => of(loadAdvertisementsError({ error: error.error ?? error.message })))
                )
            )
        )
    );

    createAdvertisement$ = createEffect(() =>
        this.actions$.pipe(
            ofType(createAdvertisement)
            // switchMap(({ advertisement }) =>
            //     this.user$.pipe(
            //         tap(this.checkUserLoggedIn)
            // filter((user): user is User => user !== null),
            // switchMap((user) => this.advertisementService.create(advertisement, user.id)),
            // map((id) => createAdvertisementSuccess({ advertisement: { ...advertisement, id: id } })),
            // catchError((error: HttpErrorResponse) =>
            //     of(createAdvertisementError({ error: error.error ?? error.message }))
            // )
            //     )
            // )
        )
    );

    updateAdvertisement$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateAdvertisement),
            switchMap(({ id, advertisement }) =>
                this.advertisementService.update(id, advertisement).pipe(
                    map((id) => updateAdvertisementSuccess({ advertisement: { ...advertisement, id: id } })),
                    catchError((error: HttpErrorResponse) =>
                        of(updateAdvertisementError({ error: error.error ?? error.message }))
                    )
                )
            )
        )
    );

    // loadImages$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(loadImages),
    //         mergeMap(({ itemId }) =>
    //             this.itemService.getImagesByItem(itemId, { maxImages: 1 }).pipe(
    //                 map((images) => loadImagesSuccess({ itemId: itemId, images: images })),
    //                 catchError((error: HttpErrorResponse) => of(loadImagesError({ error: error.error ?? error.message })))
    //             )
    //         )
    //     )
    // );

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
