import { GenericState } from 'src/app/shared/data-access/models';
import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { filter, mergeMap, switchMap, tap } from 'rxjs/operators';
import { CategoryService } from 'src/app/modules/core/services';
import { HttpErrorResponse } from '@angular/common/http';
import { GetImageQueryParams, ItemService } from 'src/app/modules/core/services/item.service';
import { MessageService } from 'src/app/modules/core/services/message.service';
import { AdvertisementService, GetAdvertisementQueryParams } from 'src/app/advertisements/data-access';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { Advertisement } from 'src/app/advertisements/data-access/models/advertisement.model';
import { IUser } from '../models';
import { AuthenticationStore } from '../../authentication/data-access';

type AdvertisementsState = GenericState<Advertisement[]>;

@Injectable()
export class AdvertisementsStore extends ComponentStore<AdvertisementsState> {
    readonly advertisements$ = this.select((state) => state.data);
    readonly isLoading$ = this.select((state) => state.status === 'loading');
    readonly error$ = this.select((state) => state.error);

    readonly loadByCategory = this.effect<{ id: number; queryParams?: GetAdvertisementQueryParams }>((params$) =>
        params$.pipe(
            tap(() => this.patchState({ status: 'loading', data: undefined })),
            switchMap(({ id, queryParams }) => this.advertisementService.getManyByCategory(id, queryParams)),
            tapResponse(
                (response) => {
                    this.patchState({ status: 'success', data: response });
                },
                (error: HttpErrorResponse) => {
                    this.handleError(error);
                }
            )
        )
    );

    readonly loadByUser = this.effect<GetAdvertisementQueryParams>((params$) =>
        params$.pipe(
            switchMap((queryParams) =>
                this.authStore.user$.pipe(
                    tap(this.checkUserLoggedIn),
                    filter((user): user is IUser => user !== null),
                    tap(() => this.patchState({ status: 'loading', data: undefined })),
                    switchMap((user) => this.advertisementService.getManyByUser(user.id, queryParams))
                )
            ),
            tapResponse(
                (response) => {
                    this.patchState({ status: 'success', data: response });
                },
                (error: HttpErrorResponse) => {
                    this.handleError(error);
                }
            )
        )
    );

    readonly loadItems = this.effect<{ id: number; queryParams?: GetAdvertisementQueryParams }>((params$) =>
        params$.pipe(
            switchMap(({ id, queryParams }) =>
                this.itemService.getByAdvertisement(id, queryParams).pipe(
                    tapResponse(
                        (item) => {
                            this.patchState((state) => {
                                const advertisements: Advertisement[] = [
                                    ...(state.data ?? []).map((value) => (value.id === id ? { ...value, item: item } : value)),
                                ];
                                return {
                                    data: advertisements,
                                };
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

    readonly loadImages = this.effect<{ id: number; queryParams?: GetImageQueryParams }>((params$) =>
        params$.pipe(
            mergeMap(({ id, queryParams }) =>
                this.itemService.getImagesByItem(id, queryParams).pipe(
                    tapResponse(
                        (images) => {
                            this.patchState((state) => {
                                const advertisements: Advertisement[] = [
                                    ...(state.data ?? []).map((value) =>
                                        value.item.id === id ? { ...value, item: { ...value.item, images: images } } : value
                                    ),
                                ];
                                return {
                                    data: advertisements,
                                };
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

    readonly delete = this.effect<number>((params$) =>
        params$.pipe(
            switchMap((id) =>
                this.advertisementService.delete(id).pipe(
                    tapResponse(
                        () =>
                            this.patchState((state) => ({
                                data: [...(state.data ?? []).filter((x) => x.id !== id)],
                            })),
                        (error: HttpErrorResponse) => this.handleError(error)
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

    private handleError = (error: HttpErrorResponse) => {
        this.patchState({ status: 'error', error: error.error ?? error.message });
        this.messageService.showMessage(error.error ?? error.message, 'error');
    };

    constructor(
        private authStore: AuthenticationStore,
        private advertisementService: AdvertisementService,
        private messageService: MessageService,
        private categoryService: CategoryService,
        private router: Router,
        private itemService: ItemService
    ) {
        super({} as AdvertisementsState);
    }
}
