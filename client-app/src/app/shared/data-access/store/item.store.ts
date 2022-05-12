import { GenericState } from 'src/app/shared/data-access/models';
import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { filter, switchMap, tap } from 'rxjs/operators';
import { IItem, IUser } from '../models/api';
import { GetItemQueryParams, ItemService } from 'src/app/modules/core/services/item.service';
import { AuthenticationStore } from '../../authentication/data-access';
import { MessageService } from 'src/app/modules/core/services/message.service';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

type ItemState = GenericState<IItem[]>;

@Injectable()
export class ItemStore extends ComponentStore<ItemState> {
    readonly items$ = this.select((state) => state.data);
    readonly isLoading$ = this.select((state) => state.status === 'loading');
    readonly error$ = this.select((state) => state.error);

    readonly loadItemsForLoggedInUser = this.effect<GetItemQueryParams>((params$) =>
        params$.pipe(
            switchMap((params) =>
                this.authStore.user$.pipe(
                    tap(this.checkUserLoggedIn),
                    filter((user): user is IUser => user !== null),
                    switchMap((user) =>
                        this.itemService.getByUser(user.id, params).pipe(
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

    readonly delete = this.effect<number>((params$) =>
        params$.pipe(
            switchMap((id) =>
                this.itemService.delete(id).pipe(
                    tapResponse(
                        () => {
                            this.removeItem(id);
                        },
                        (error: HttpErrorResponse) => {
                            this.handleError(error);
                        }
                    )
                )
            )
        )
    );

    readonly updateAndGet = this.effect<{ id: number; item: IItem; queryParams?: GetItemQueryParams }>((params$) =>
        params$.pipe(
            switchMap((params) =>
                this.itemService
                    .update(params.id, params.item)
                    .pipe(switchMap((response) => this.itemService.get(response, params.queryParams)))
            ),
            tapResponse(
                (response) => {
                    this.updateItem(response);
                },
                (error: HttpErrorResponse) => {
                    this.handleError(error);
                }
            )
        )
    );

    readonly createAndGet = this.effect<{ item: IItem; queryParams?: GetItemQueryParams }>((params$) =>
        params$.pipe(
            switchMap((params) =>
                this.createItem(params.item).pipe(switchMap((response) => this.itemService.get(response, params.queryParams)))
            ),
            tapResponse(
                (response) => {
                    this.addItem(response);
                },
                (error: HttpErrorResponse) => {
                    this.handleError(error);
                }
            )
        )
    );

    private readonly createItem = (item: IItem) =>
        this.authStore.user$.pipe(
            tap(this.checkUserLoggedIn),
            filter((user): user is IUser => user !== null),
            switchMap((user) => this.itemService.create(item, user.id))
        );

    private readonly checkUserLoggedIn = (user: IUser | null) => {
        if (user === null) {
            this.messageService.showMessage('Nie jesteś zalogowany!', 'error');
            this.router.navigate(['welcome'], { queryParams: { returnUrl: this.router.routerState.snapshot.url } });

            throwError(new Error('User is not logged in'));
        }
    };

    private readonly addItem = this.updater((state, item: IItem) => {
        return { ...state, data: [...(state.data ?? []), item] };
    });
    private readonly updateItem = this.updater((state, item: IItem) => {
        const items = (state.data ?? []).map((value) => (value.id == item.id ? item : value));
        return { ...state, data: [...items] };
    });
    private readonly removeItem = this.updater((state, id: number) => {
        const items = (state.data ?? []).filter((value) => value.id != id);
        return { ...state, data: [...items] };
    });

    private handleError = (error: HttpErrorResponse) => {
        this.messageService.showMessage(error.error?.errorMessages[0] ?? '', 'error');
    };

    constructor(
        private itemService: ItemService,
        private authStore: AuthenticationStore,
        private messageService: MessageService,
        private router: Router
    ) {
        super({} as ItemState);
    }
}
