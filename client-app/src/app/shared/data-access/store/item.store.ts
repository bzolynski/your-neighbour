import { GenericState } from 'src/app/shared/data-access/models';
import { Injectable, Optional } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { filter, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { IItem, IUser } from '../models/api';
import { GetImageQueryParams, GetItemQueryParams, ItemService } from 'src/app/modules/core/services/item.service';
import { AuthenticationStore } from '../../authentication/data-access';
import { MessageService } from 'src/app/modules/core/services/message.service';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { CategoryService } from 'src/app/modules/core/services';
import { ItemsStore } from './items.store';

type ItemState = GenericState<IItem>;

@Injectable()
export class ItemStore extends ComponentStore<ItemState> {
    readonly item$ = this.select((state) => state.data);
    readonly isLoading$ = this.select((state) => state.status === 'loading');
    readonly error$ = this.select((state) => state.error);

    readonly create = this.effect<IItem>((params$) =>
        params$.pipe(
            switchMap((item) =>
                this.authStore.user$.pipe(
                    tap(this.checkUserLoggedIn),
                    filter((user): user is IUser => user !== null),
                    switchMap((user) => this.itemService.create(item, user.id)),
                    switchMap((id) =>
                        this.categoryService
                            .get(item.categoryId)
                            .pipe(map((category) => ({ ...item, id: id, category: category } as IItem)))
                    )
                )
            ),
            tapResponse(
                (item) => {
                    this.patchState({ data: item });
                    if (this.itemsStore) this.itemsStore.addItem(item);
                },
                (error: HttpErrorResponse) => {
                    this.handleError(error);
                }
            )
        )
    );
    readonly load = this.effect<{ id: number; queryParams?: GetItemQueryParams }>((params$) =>
        params$.pipe(
            switchMap(({ id, queryParams }) =>
                this.itemService.get(id, queryParams).pipe(
                    tapResponse(
                        (response) => {
                            this.patchState({ data: response });
                        },
                        (error: HttpErrorResponse) => {
                            this.handleError(error);
                        }
                    )
                )
            )
        )
    );

    readonly loadImages = this.effect<{ id: number; queryParams?: GetImageQueryParams }>((params$) =>
        params$.pipe(
            mergeMap(({ id, queryParams }) =>
                this.itemService.getImagesByItem(id, queryParams).pipe(
                    tapResponse(
                        (images) => {
                            this.patchState((state) => ({ data: { ...(state.data as IItem), images: images } }));
                        },
                        (error: HttpErrorResponse) => {
                            this.handleError(error);
                        }
                    )
                )
            )
        )
    );
    readonly update = this.effect<{ id: number; item: IItem }>((params$) =>
        params$.pipe(
            switchMap((params) =>
                this.itemService.update(params.id, params.item).pipe(
                    switchMap(() => this.categoryService.get(params.item.categoryId)),
                    map((category) => ({ ...params.item, id: params.id, category: category } as IItem)),
                    tapResponse(
                        (item) => {
                            this.patchState((state) => ({
                                data: { /*...state.data,*/ ...item },
                            }));
                            if (this.itemsStore) this.itemsStore.updateItem(item);
                        },
                        (error: HttpErrorResponse) => this.handleError(error)
                    )
                )
            )
        )
    );

    readonly delete = this.effect<number>((params$) =>
        params$.pipe(
            switchMap((id) =>
                this.itemService.delete(id).pipe(
                    tapResponse(
                        () => {
                            this.patchState({ data: undefined });
                            if (this.itemsStore) this.itemsStore.deleteItem(id);
                        },
                        (error: HttpErrorResponse) => {
                            this.handleError(error);
                        }
                    )
                )
            )
        )
    );

    private readonly checkUserLoggedIn = (user: IUser | null) => {
        if (user === null) {
            this.messageService.showMessage('Nie jesteś zalogowany!', 'error');
            this.router.navigate(['welcome'], { queryParams: { returnUrl: this.router.routerState.snapshot.url } });

            throwError(new Error('User is not logged in'));
        }
    };

    private handleError = (error: HttpErrorResponse) => {
        this.messageService.showMessage(error.error ?? error.message, 'error');
    };

    constructor(
        private itemService: ItemService,
        private authStore: AuthenticationStore,
        private messageService: MessageService,
        private categoryService: CategoryService,
        private router: Router,
        @Optional() private itemsStore: ItemsStore
    ) {
        super({} as ItemState);
    }
}
