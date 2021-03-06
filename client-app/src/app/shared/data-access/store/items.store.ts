import { GenericState } from 'src/app/shared/data-access/models';
import { Injectable } from '@angular/core';
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

type ItemsState = GenericState<IItem[]>;

@Injectable()
export class ItemsStore extends ComponentStore<ItemsState> {
    readonly items$ = this.select((state) => state.data);
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
                    this.patchState((state) => ({ data: [...(state.data ?? []), item] }));
                },
                (error: HttpErrorResponse) => {
                    this.handleError(error);
                }
            )
        )
    );
    readonly addItem = (item: IItem) => this.patchState((state) => ({ data: [...(state.data ?? []), item] }));
    readonly loadForLoggedInUser = this.effect<GetItemQueryParams>((params$) =>
        params$.pipe(
            switchMap((query) =>
                this.authStore.user$.pipe(
                    tap(this.checkUserLoggedIn),
                    filter((user): user is IUser => user !== null),
                    switchMap((user) =>
                        this.itemService.getByUser(user.id, query).pipe(
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
            )
        )
    );

    readonly loadImages = this.effect<{ id: number; queryParams?: GetImageQueryParams }>((params$) =>
        params$.pipe(
            mergeMap(({ id, queryParams }) =>
                this.itemService.getImagesByItem(id, queryParams).pipe(
                    tapResponse(
                        (images) => {
                            this.patchState((state) => {
                                const item: IItem[] = [
                                    ...(state.data ?? []).map((value) =>
                                        value.id === id ? { ...value, images: images } : value
                                    ),
                                ];
                                return { data: item };
                            });
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
                            this.updateItem(item);
                        },
                        (error: HttpErrorResponse) => this.handleError(error)
                    )
                )
            )
        )
    );

    readonly updateItem = (item: IItem) =>
        this.patchState((state) => ({
            data: [...(state.data ?? []).map((value) => (value.id == item.id ? item : value))],
        }));

    readonly delete = this.effect<number>((params$) =>
        params$.pipe(
            switchMap((id) =>
                this.itemService.delete(id).pipe(
                    tapResponse(
                        () => {
                            this.deleteItem(id);
                        },
                        (error: HttpErrorResponse) => {
                            this.handleError(error);
                        }
                    )
                )
            )
        )
    );

    readonly deleteItem = (itemId: number) =>
        this.patchState((state) => ({
            data: [...(state.data ?? []).filter((value) => value.id != itemId)],
        }));

    private readonly checkUserLoggedIn = (user: IUser | null) => {
        if (user === null) {
            this.messageService.showMessage('Nie jeste?? zalogowany!', 'error');
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
        private router: Router,
        private categoryService: CategoryService
    ) {
        super({} as ItemsState);
    }
}
