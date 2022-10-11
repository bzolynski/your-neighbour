import { GenericState } from '@core/types/.';
import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { filter, switchMap, tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { AdvertisementService, CategoryService, GetAdvertisementQueryParams } from '@core/services/.';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { Advertisement, User } from '@core/models/';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectUser } from '@core/stores/authentication';

type AdvertisementsState = GenericState<Advertisement[]>;

@Injectable()
export class AdvertisementsStore extends ComponentStore<AdvertisementsState> {
    user$: Observable<User | null> = this.store.select(selectUser);
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
                this.user$.pipe(
                    tap(this.checkUserLoggedIn),
                    filter((user): user is User => user !== null),
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
    /*
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
*/
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

    private readonly checkUserLoggedIn = (user: User | null) => {
        if (user === null) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Nie jesteś zalogowany' });
            this.router.navigate(['welcome'], { queryParams: { returnUrl: this.router.routerState.snapshot.url } });

            throwError(new Error('User is not logged in'));
        }
    };
    private handleError = (error: HttpErrorResponse) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error ?? error.message });
    };

    constructor(
        private store: Store,
        private advertisementService: AdvertisementService,
        private messageService: MessageService,
        private categoryService: CategoryService,
        private router: Router
    ) {
        super({} as AdvertisementsState);
    }
}
