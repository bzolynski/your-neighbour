import { Localization, User } from '@models/';
import { GenericState, GenericStoreStatus } from '@app-types/.';
import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { switchMap, tap, filter, withLatestFrom } from 'rxjs/operators';
import { LocalizationService, UserService } from '@services/.';
import { HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { selectUser, updateUserData } from '@stores/authentication';
import { MessageService } from 'primeng/api';

export type FormMode = 'edit' | 'create';

interface SettingsAccountState extends GenericState<Localization[]> {
    editingLocalization: boolean;
    localizationFormOpen: boolean;
    localizationFormStatus: GenericStoreStatus;
    nameFormOpen: boolean;
    nameFormStatus: GenericStoreStatus;
    numberFormOpen: boolean;
    numberFormStatus: GenericStoreStatus;
    emailFormOpen: boolean;
    emailFormStatus: GenericStoreStatus;
}

@Injectable()
export class SettingsAccountStore extends ComponentStore<SettingsAccountState> {
    readonly localizations$ = this.select((state) => state.data);
    readonly status$ = this.select((state) => state.status);
    readonly error$ = this.select((state) => state.error);
    readonly editingLocalization$ = this.select((state) => state.editingLocalization);
    readonly localizationFormOpen$ = this.select((state) => state.localizationFormOpen);
    readonly localizationFormStatus$ = this.select((state) => state.localizationFormStatus);
    readonly nameFormOpen$ = this.select((state) => state.nameFormOpen);
    readonly nameFormStatus$ = this.select((state) => state.nameFormStatus);
    readonly numberFormOpen$ = this.select((state) => state.numberFormOpen);
    readonly numberFormStatus$ = this.select((state) => state.numberFormStatus);
    readonly emailFormOpen$ = this.select((state) => state.emailFormOpen);
    readonly emailFormStatus$ = this.select((state) => state.emailFormStatus);

    protected user$ = this.store.select(selectUser).pipe(
        filter((user): user is User => {
            if (user) return true;
            this.patchState({ error: 'Nie jesteś zalogowany!' });
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Nie jesteś zalogowany' });
            return false;
        })
    );
    constructor(
        private store: Store,
        private localizationService: LocalizationService,
        private userService: UserService,
        private messageService: MessageService
    ) {
        super({ localizationFormOpen: false } as SettingsAccountState);
    }

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
            tap(() => this.patchState({ localizationFormStatus: 'loading' })),
            withLatestFrom(this.user$),
            switchMap(([localization, user]) =>
                this.localizationService.create(localization, user.id).pipe(
                    tapResponse(
                        (response) => {
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Sukces',
                                detail: 'Pomyślnie dodano lokalizację!',
                            });
                            this.patchState((state) => ({
                                data: [...(state.data ?? []), { ...localization, id: response }],
                                localizationFormStatus: 'success',
                                localizationFormOpen: false,
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
    readonly updateName = this.effect<{ firstName: string; lastName: string }>((params$) =>
        params$.pipe(
            tap(() => this.patchState({ nameFormStatus: 'loading' })),
            withLatestFrom(this.user$),
            switchMap(([{ firstName, lastName }, user]) =>
                this.userService.update(user.id, { firstName, lastName } as User).pipe(
                    tapResponse(
                        () => {
                            this.store.dispatch(updateUserData({ user: { ...user, firstName, lastName } }));
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Sukces',
                                detail: 'Pomyślnie zaktualizowano dane!',
                            });
                            this.patchState((state) => ({
                                nameFormStatus: 'success',
                                nameFormOpen: false,
                            }));
                        },
                        (error: HttpErrorResponse) => this.handleError(error)
                    )
                )
            )
        )
    );

    readonly updateEmail = this.effect<{ email: string }>((params$) =>
        params$.pipe(
            tap(() => this.patchState({ emailFormStatus: 'loading' })),
            withLatestFrom(this.user$),
            tapResponse(
                ([{ email }, user]) => {
                    // this.store.dispatch(updateUserData({ user: { ...user, email } }));
                    this.messageService.add({
                        severity: 'info',
                        summary: 'Info',
                        detail: 'Funkcjonalność jeszcze nie zaimplementowana!',
                    });
                    this.patchState((state) => ({
                        emailFormStatus: 'success',
                        emailFormOpen: false,
                    }));
                },
                (error: HttpErrorResponse) => this.handleError(error)
            )
        )
    );

    readonly updateNumber = this.effect<{ phoneNumber: string }>((params$) =>
        params$.pipe(
            tap(() => this.patchState({ numberFormStatus: 'loading' })),
            withLatestFrom(this.user$),
            switchMap(([{ phoneNumber }, user]) =>
                this.userService.update(user.id, { phoneNumber } as User).pipe(
                    tapResponse(
                        () => {
                            this.store.dispatch(updateUserData({ user: { ...user, phoneNumber } }));
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Sukces',
                                detail: 'Pomyślnie zaktualizowano numer telefonu!',
                            });
                            this.patchState((state) => ({
                                numberFormStatus: 'success',
                                numberFormOpen: false,
                            }));
                        },
                        (error: HttpErrorResponse) => this.handleError(error)
                    )
                )
            )
        )
    );
    readonly setLocalizationEditing = this.updater<boolean>((state, editing) => {
        return { ...state, editingLocalization: editing };
    });
    readonly setLocalizationFormOpen = this.updater<boolean>((state, formOpen) => {
        return { ...state, localizationFormOpen: formOpen };
    });
    readonly setNameFormOpen = this.updater<boolean>((state, formOpen) => {
        return { ...state, nameFormOpen: formOpen };
    });
    readonly setEmailFormOpen = this.updater<boolean>((state, formOpen) => {
        return { ...state, emailFormOpen: formOpen };
    });
    readonly setNumberFormOpen = this.updater<boolean>((state, formOpen) => {
        return { ...state, numberFormOpen: formOpen };
    });
    private handleError = (error: HttpErrorResponse) => {
        this.patchState({ error: error.error, status: 'error' });
        this.messageService.add({ severity: 'error', summary: 'Błąd', detail: error.error });
    };
}
