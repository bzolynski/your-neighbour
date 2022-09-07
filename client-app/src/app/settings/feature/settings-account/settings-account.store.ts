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
    mode: FormMode;
}

@Injectable()
export class SettingsAccountStore extends ComponentStore<SettingsAccountState> {
    readonly localizations$ = this.select((state) => state.data);
    readonly mode$ = this.select((state) => state.mode);
    readonly status$ = this.select((state) => state.status);
    readonly error$ = this.select((state) => state.error);

    protected user$ = this.store.select(selectUser).pipe(
        filter((user): user is User => {
            if (user) return true;
            this.patchState({ error: 'Nie jesteś zalogowany!' });
            return false;
        })
    );
    constructor(private store: Store, private localizationService: LocalizationService, private messageService: MessageService) {
        super({} as SettingsAccountState);
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
                (error: HttpErrorResponse) => {
                    this.patchState({ error: error.message });
                }
            )
        )
    );
    readonly createLocalization = this.effect<Localization>((params$) =>
        params$.pipe(
            withLatestFrom(this.user$),
            switchMap(([localization, user]) =>
                this.localizationService.create(localization, user.id).pipe(
                    tapResponse(
                        (response) => {
                            this.patchState((state) => ({ data: [...(state.data ?? []), { ...localization, id: response }] }));
                        },
                        (error: HttpErrorResponse) => {
                            this.patchState({ error: error.message });
                        }
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
                        (error: HttpErrorResponse) => {
                            this.patchState({ error: error.message });
                        }
                    )
                )
            )
        )
    );
    readonly deleteLocalization = this.effect<number>((params$) =>
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
                            this.patchState({ error: error.message });
                        }
                    )
                )
            )
        )
    );
    readonly setPrimaryLocalization = this.effect<number>((params$) =>
        params$.pipe(
            switchMap((id) =>
                this.localizationService.setPrimary(id).pipe(
                    tapResponse(
                        () => {
                            this.patchState((state) => ({
                                data: (state.data ?? []).map((value) =>
                                    value.id === id ? { ...value, isPrimary: true } : { ...value, isPrimary: false }
                                ),
                            }));
                        },
                        (error: HttpErrorResponse) => {
                            this.patchState({ error: error.message });
                        }
                    )
                )
            )
        )
    );
    readonly setMode = this.updater<{ mode: FormMode }>((state, { mode }) => {
        return { ...state, mode: mode };
    });
}
