import { GenericState } from '@core/types/.';
import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Localization, User } from '@core/models/';
import { LocalizationService } from '@core/services/.';
import { MessageService } from 'primeng/api';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectUser } from '@core/stores/authentication';

type LocalizationsState = GenericState<Localization[]>;

@Injectable()
export class LocalizationsStore extends ComponentStore<LocalizationsState> {
    user$: Observable<User | null> = this.store.select(selectUser);
    readonly localizations$ = this.select((state) => state.data);
    readonly isLoading$ = this.select((state) => state.status === 'loading');
    readonly error$ = this.select((state) => state.error);

    readonly create = this.effect<Localization>((params$) =>
        params$.pipe(
            switchMap((localization) =>
                this.user$.pipe(
                    tap(this.checkUserLoggedIn),
                    filter((user): user is User => user !== null),
                    switchMap((user) => this.localizationService.create(localization, user.id)),
                    map((id) => ({ ...localization, id: id } as Localization))
                )
            ),
            tapResponse(
                (localization) => {
                    this.patchState((state) => ({ data: [...(state.data ?? []), localization] }));
                },
                (error: HttpErrorResponse) => {
                    this.handleError(error);
                }
            )
        )
    );
    readonly loadForLoggedInUser = this.effect(($) =>
        $.pipe(
            switchMap(() => this.user$),
            tap(this.checkUserLoggedIn),
            filter((user): user is User => user !== null),
            switchMap((user) =>
                this.localizationService.getManyByUser(user.id).pipe(
                    tapResponse(
                        (response) => {
                            this.patchState({ data: response });
                        },
                        (error: HttpErrorResponse) => this.handleError(error)
                    )
                )
            )
        )
    );

    readonly update = this.effect<{ id: number; localization: Localization }>((params$) =>
        params$.pipe(
            switchMap(({ id, localization }) =>
                this.localizationService.update(id, localization).pipe(map(() => ({ ...localization, id: id } as Localization)))
            ),
            tapResponse(
                (response) => {
                    this.patchState((state) => ({
                        data: [
                            ...(state.data ?? []).map((value) => (value.id === response.id ? { ...value, ...response } : value)),
                        ],
                    }));
                },
                (error: HttpErrorResponse) => {
                    this.handleError(error);
                }
            )
        )
    );
    readonly delete = this.effect<number>((params$) =>
        params$.pipe(
            switchMap((id) =>
                this.localizationService.delete(id).pipe(
                    tapResponse(
                        () => {
                            this.patchState((state) => ({
                                data: [...(state.data ?? []).filter((x) => x.id !== id)],
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
        private localizationService: LocalizationService,
        private store: Store,
        private router: Router,
        private messageService: MessageService
    ) {
        super({} as LocalizationsState);
    }
}
