import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, throwError } from 'rxjs';
import { catchError, filter, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { AdvertisementService } from 'src/app/advertisements/data-access';
import { ItemService } from 'src/app/modules/core/services/item.service';
import { MessageService } from 'src/app/modules/core/services/message.service';
import { AuthenticationStore } from 'src/app/shared/authentication/data-access';
import { IUser } from 'src/app/shared/data-access/models';
import {
    deleteAdvertisement,
    deleteAdvertisementError,
    deleteAdvertisementSuccess,
    loadAdvertisements,
    loadAdvertisementsError,
    loadAdvertisementsSuccess,
    loadImages,
    loadImagesError,
    loadImagesSuccess,
} from './settings-my-advertisements.actions';

@Injectable()
export class SettingsMyAdvertisementsEffects {
    constructor(
        private actions$: Actions,
        private itemService: ItemService,
        private advertisementService: AdvertisementService,
        private authStore: AuthenticationStore,
        private messageService: MessageService,
        private router: Router
    ) {}

    loadAdvertisements$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadAdvertisements),
            switchMap(() =>
                this.authStore.user$.pipe(
                    tap(this.checkUserLoggedIn),
                    filter((user): user is IUser => user !== null),
                    switchMap((user) =>
                        this.advertisementService.getManyByUser(user.id, {
                            includeCategory: true,
                            includeLocalization: true,
                            includeItem: true,
                        })
                    ),
                    map((advertisements) => loadAdvertisementsSuccess({ advertisements: advertisements })),
                    catchError((error: HttpErrorResponse) => of(loadAdvertisementsError({ error: error.error ?? error.message })))
                )
            )
        )
    );

    loadImages$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadImages),
            mergeMap(({ itemId }) =>
                this.itemService.getImagesByItem(itemId, { maxImages: 1 }).pipe(
                    map((images) => loadImagesSuccess({ itemId: itemId, images: images })),
                    catchError((error: HttpErrorResponse) => of(loadImagesError({ error: error.error ?? error.message })))
                )
            )
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

    private checkUserLoggedIn = (user: IUser | null) => {
        if (user === null) {
            this.messageService.showMessage('Nie jesteś zalogowany!', 'error');
            this.router.navigate(['welcome'], { queryParams: { returnUrl: this.router.routerState.snapshot.url } });

            throwError(new Error('User is not logged in'));
        }
    };
}
