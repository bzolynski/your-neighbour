import { GenericState } from 'src/app/shared/data-access/models';
import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { filter, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { IItem, IUser } from '../models/api';
import { GetImageQueryParams, GetItemQueryParams, ItemService } from 'src/app/modules/core/services/item.service';
import { AuthenticationStore } from '../../authentication/data-access';
import { MessageService } from 'src/app/modules/core/services/message.service';
import { Router } from '@angular/router';
import { from, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { CategoryService } from 'src/app/modules/core/services';

type ItemState = GenericState<IItem[]>;

@Injectable()
export class ItemStore extends ComponentStore<ItemState> {
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
                    tapResponse(
                        (response) => {
                            item.id = response;
                            this.patchState((state) => ({ ...state, data: [...(state.data ?? []), item] }));
                        },
                        (error: HttpErrorResponse) => {
                            this.handleError(error);
                        }
                    )
                )
            )
        )
    );
    readonly loadForLoggedInUser = this.effect<{ itemQuery?: GetItemQueryParams; imageQuery?: GetImageQueryParams }>((params$) =>
        params$.pipe(
            switchMap((params) =>
                this.authStore.user$.pipe(
                    tap(this.checkUserLoggedIn),
                    filter((user): user is IUser => user !== null),
                    switchMap((user) =>
                        this.itemService.getByUser(user.id, params.itemQuery).pipe(
                            tapResponse(
                                (response) => {
                                    this.patchState({ data: response });
                                },
                                (error: HttpErrorResponse) => {
                                    this.handleError(error);
                                }
                            )
                        )
                    ),
                    filter(() => params.imageQuery !== undefined),
                    switchMap((response) => from(response.map((x) => x.id))),
                    mergeMap((id) =>
                        this.itemService.getImagesByItem(id, params.imageQuery).pipe(
                            tap((images) =>
                                this.patchState((state) => ({
                                    ...state,
                                    data: (state.data ?? []).map((value) =>
                                        value.id === id ? { ...value, images: images } : value
                                    ),
                                }))
                            )
                        )
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
                            console.log(item);

                            this.patchState((state) => ({
                                ...state,
                                data: [...(state.data ?? []).map((value) => (value.id == item.id ? item : value))],
                            }));
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
                            this.patchState((state) => ({
                                ...state,
                                data: [...(state.data ?? []).filter((value) => value.id != id)],
                            }));
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
        this.messageService.showMessage(error.message, 'error');
    };

    constructor(
        private itemService: ItemService,
        private authStore: AuthenticationStore,
        private messageService: MessageService,
        private router: Router,
        private categoryService: CategoryService
    ) {
        super({} as ItemState);
    }
}
