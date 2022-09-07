import { Localization, User } from '@models/';
import { GenericState } from '@app-types/.';
import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { switchMap, tap, filter, withLatestFrom } from 'rxjs/operators';
import { LocalizationService } from '@services/.';
import { HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { selectUser } from '@stores/authentication';
import { MessageService } from 'primeng/api';

export type FormMode = 'edit' | 'create';

interface SettingsAccountState extends GenericState<Localization[]> {
    formOpen: boolean;
}

@Injectable()
export class SettingsAccountStore extends ComponentStore<SettingsAccountState> {
    readonly localizations$ = this.select((state) => state.data);
    readonly formOpen$ = this.select((state) => state.formOpen);
    readonly status$ = this.select((state) => state.status);
    readonly error$ = this.select((state) => state.error);

    protected user$ = this.store.select(selectUser).pipe(
        filter((user): user is User => {
            if (user) return true;
            this.patchState({ error: 'Nie jesteś zalogowany!' });
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Nie jesteś zalogowany' });
            return false;
        })
    );
    constructor(private store: Store, private localizationService: LocalizationService, private messageService: MessageService) {
        super({ formOpen: false } as SettingsAccountState);
    }
    /*
    updateUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateUser),
            switchMap(({ id, user }) =>
                this.userService.update(id, user).pipe(
                    map(() => {
                        console.log(user);
                        this.store.dispatch(updateUserData({ user: user }));
                        return updateUserSuccess({ user: { ...user, id: id } });
                    }),
                    catchError((error: HttpErrorResponse) => of(updateUserError({ error: error.error ?? error.message })))
                )
            )
        )
    ); */
    readonly loadLocalizations = this.effect(($) =>
        $.pipe(
            tap(() => this.patchState({ data: null, status: 'loading' })),
            withLatestFrom(this.user$),
            switchMap(([_, user]) => this.localizationService.getManyByUser(user.id)),
            tapResponse(
                (response) => {
                    this.patchState({ data: response, status: 'success' });
                },
                (error: HttpErrorResponse) => this.handleError(error)
            )
        )
    );
    readonly createLocalization = this.effect<Localization>((params$) =>
        params$.pipe(
            tap(() => this.patchState({ status: 'loading' })),
            withLatestFrom(this.user$),
            switchMap(([localization, user]) =>
                this.localizationService.create(localization, user.id).pipe(
                    tapResponse(
                        (response) => {
                            this.patchState((state) => ({
                                data: [...(state.data ?? []), { ...localization, id: response }],
                                status: 'success',
                            }));
                        },
                        (error: HttpErrorResponse) => this.handleError(error)
                    )
                )
            )
        )
    );
    readonly updateLocalization = this.effect<{ id: number; localization: Localization }>((params$) =>
        params$.pipe(
            tap(() => this.patchState({ status: 'loading' })),
            switchMap(({ id, localization }) =>
                this.localizationService.update(id, localization).pipe(
                    tapResponse(
                        (response) => {
                            this.patchState((state) => ({
                                data: [
                                    ...(state.data ?? []).map((value) =>
                                        value.id === response ? { ...value, ...localization } : value
                                    ),
                                ],
                                status: 'success',
                            }));
                        },
                        (error: HttpErrorResponse) => this.handleError(error)
                    )
                )
            )
        )
    );
    readonly deleteLocalization = this.effect<number>((params$) =>
        params$.pipe(
            tap(() => this.patchState({ status: 'loading' })),
            switchMap((id) =>
                this.localizationService.delete(id).pipe(
                    tapResponse(
                        () => {
                            this.patchState((state) => ({
                                data: [...(state.data ?? []).filter((x) => x.id !== id)],
                                status: 'success',
                            }));
                        },
                        (error: HttpErrorResponse) => this.handleError(error)
                    )
                )
            )
        )
    );
    readonly setPrimaryLocalization = this.effect<number>((params$) =>
        params$.pipe(
            tap(() => this.patchState({ status: 'loading' })),
            switchMap((id) =>
                this.localizationService.setPrimary(id).pipe(
                    tapResponse(
                        () => {
                            this.patchState((state) => ({
                                data: (state.data ?? []).map((value) =>
                                    value.id === id ? { ...value, isPrimary: true } : { ...value, isPrimary: false }
                                ),
                                status: 'success',
                            }));
                        },
                        (error: HttpErrorResponse) => this.handleError(error)
                    )
                )
            )
        )
    );
    readonly setFormOpen = this.updater<boolean>((state, formOpen) => {
        return { ...state, formOpen: formOpen };
    });
    private handleError = (error: HttpErrorResponse) => {
        this.patchState({ error: error.error, status: 'error' });
        this.messageService.add({ severity: 'error', summary: 'Błąd', detail: error.error });
    };
}
