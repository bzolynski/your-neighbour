import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ItemService } from 'src/app/modules/core/services/item.service';
import { UserService } from 'src/app/shared/data-access/api';
import { AdvertisementService } from '../advertisement.service';
import {
    loadAdvertisement,
    loadAdvertisementError,
    loadAdvertisementSuccess,
    loadImagesError,
    loadImagesSuccess,
    loadUserSuccess,
} from './advertisement-details.actions';

@Injectable()
export class AdvertisementDetailsEffects {
    constructor(
        private actions$: Actions,
        private advertisementService: AdvertisementService,
        private itemService: ItemService,
        private userService: UserService
    ) {}
    loadAdvertisement$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadAdvertisement),
            switchMap(({ id }) =>
                this.advertisementService.get(id, {
                    includeCategory: true,
                    includeDefinition: true,
                    includeLocalization: true,
                    includeUser: true,
                    includeItem: true,
                })
            ),
            map((advertisement) => loadAdvertisementSuccess({ advertisement: advertisement })),
            catchError((error: HttpErrorResponse) => of(loadAdvertisementError({ error: error.error ?? error.message })))
        )
    );

    loadImages$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadAdvertisementSuccess),
            switchMap(({ advertisement }) => this.itemService.getImagesByItem(advertisement.item.id)),
            map((images) => loadImagesSuccess({ images: images })),
            catchError((error: HttpErrorResponse) => of(loadImagesError({ error: error.error ?? error.message })))
        )
    );
    loadUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadAdvertisementSuccess),
            switchMap(({ advertisement }) => this.userService.get(advertisement.userId)),
            map((user) => loadUserSuccess({ user: user })),
            catchError((error: HttpErrorResponse) => of(loadImagesError({ error: error.error ?? error.message })))
        )
    );
}
