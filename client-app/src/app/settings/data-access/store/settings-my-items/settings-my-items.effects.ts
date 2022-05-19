import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, throwError } from 'rxjs';
import { catchError, filter, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { ItemService } from 'src/app/modules/core/services/item.service';
import { MessageService } from 'src/app/modules/core/services/message.service';
import { AuthenticationStore } from 'src/app/shared/authentication/data-access';
import { IUser } from 'src/app/shared/data-access/models';
import {
    deleteItem,
    deleteItemError,
    deleteItemSuccess,
    loadImages,
    loadImagesError,
    loadImagesSuccess,
    loadItems,
    loadItemsError,
    loadItemsSuccess,
} from './settings-my-items.actions';

@Injectable()
export class SettingsMyItemsEffects {
    constructor(
        private actions$: Actions,
        private itemService: ItemService,
        private authStore: AuthenticationStore,
        private messageService: MessageService,
        private router: Router
    ) {}

    loadItems$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadItems),
            switchMap(() =>
                this.authStore.user$.pipe(
                    tap(this.checkUserLoggedIn),
                    filter((user): user is IUser => user !== null),
                    switchMap((user) =>
                        this.itemService.getByUser(user.id, { includeCategory: true }).pipe(
                            map((items) => loadItemsSuccess({ items: items })),
                            catchError((error: HttpErrorResponse) => of(loadItemsError({ error: error.error ?? error.message })))
                        )
                    )
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
    deleteItem$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteItem),
            switchMap(({ id }) =>
                this.itemService.delete(id).pipe(
                    map(() => deleteItemSuccess({ id })),
                    catchError((error: HttpErrorResponse) => of(deleteItemError({ error: error.error ?? error.message })))
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
