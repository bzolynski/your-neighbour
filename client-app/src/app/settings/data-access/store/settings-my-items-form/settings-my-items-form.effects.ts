import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of, throwError } from 'rxjs';
import { catchError, filter, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { CategoryService } from 'src/app/modules/core/services';
import { ItemService } from 'src/app/modules/core/services/item.service';
import { MessageService } from 'src/app/modules/core/services/message.service';
import { AuthenticationStore } from 'src/app/shared/authentication/data-access';
import { IItem, IUser } from 'src/app/shared/data-access/models';
import {
    createItem,
    createItemError,
    createItemSuccess,
    loadCategories,
    loadCategoriesError,
    loadCategoriesSuccess,
    loadImagesError,
    loadImagesSuccess,
    loadItem,
    loadItemError,
    loadItemSuccess,
    updateItem,
    updateItemError,
    updateItemSuccess,
} from './settings-my-items-form.actions';
import { SettingsMyItemsFormState } from './settings-my-items-form.reducer';

@Injectable()
export class SettingsMyItemsFormEffects {
    constructor(
        private actions$: Actions,
        private store: Store<SettingsMyItemsFormState>,
        private itemService: ItemService,
        private authStore: AuthenticationStore,
        private messageService: MessageService,
        private categoryService: CategoryService,
        private router: Router
    ) {}

    loadItem$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadItem),
            switchMap(({ id }) =>
                this.itemService.get(id, { includeCategory: true }).pipe(
                    map((item) => loadItemSuccess({ item })),
                    catchError((error: HttpErrorResponse) => of(loadItemError({ error: error.error ?? error.message })))
                )
            )
        )
    );

    loadImages$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadItemSuccess),
            mergeMap(({ item }) =>
                this.itemService.getImagesByItem(item.id, { maxImages: 1 }).pipe(
                    map((images) => loadImagesSuccess({ images: images })),
                    catchError((error: HttpErrorResponse) => of(loadImagesError({ error: error.error ?? error.message })))
                )
            )
        )
    );

    loadCategories$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadCategories),
            switchMap(() =>
                this.categoryService.getMany().pipe(
                    map((categories) => loadCategoriesSuccess({ categories: categories })),
                    catchError((error: HttpErrorResponse) => of(loadCategoriesError({ error: error.error ?? error.message })))
                )
            )
        )
    );

    createItem$ = createEffect(() =>
        this.actions$.pipe(
            ofType(createItem),
            switchMap(({ item }) =>
                this.authStore.user$.pipe(
                    tap(this.checkUserLoggedIn),
                    filter((user): user is IUser => user !== null),
                    switchMap((user) => this.itemService.create(item, user.id)),
                    switchMap((id) =>
                        this.categoryService
                            .get(item.categoryId)
                            .pipe(map((category) => ({ ...item, id: id, category: category } as IItem)))
                    ),
                    map((item) => createItemSuccess({ item })),
                    catchError((error: HttpErrorResponse) => of(createItemError({ error: error.error ?? error.message })))
                )
            )
        )
    );
    updateItem$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateItem),
            switchMap(({ id, item }) =>
                this.itemService.update(id, item).pipe(
                    switchMap(() => this.categoryService.get(item.categoryId)),
                    map((category) => ({ ...item, id: id, category: category } as IItem)),
                    map((item) => updateItemSuccess({ item })),
                    catchError((error: HttpErrorResponse) => of(updateItemError({ error: error.error ?? error.message })))
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
