import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { throwError } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import { LocalizationService } from 'src/app/modules/core/services/localization.service';
import { MessageService } from 'src/app/modules/core/services/message.service';
import { AuthenticationStore } from 'src/app/shared/authentication/data-access';
import { GenericState, IUser, Localization } from 'src/app/shared/data-access/models';

type SettingsMyLocalizationsState = GenericState<Localization[]>;

@Injectable()
export class SettingsMyLocalizationsStore extends ComponentStore<SettingsMyLocalizationsState> {
    readonly localizations$ = this.select((state) => state.data);
    readonly isLoading$ = this.select((state) => state.status == 'loading');
    readonly error$ = this.select((state) => state.error);

    readonly delete = this.effect<number>((params$) =>
        params$.pipe(
            switchMap((id) =>
                this.localizationService.delete(id).pipe(
                    tapResponse(
                        () => this.deleteLocalization(id),
                        (error: HttpErrorResponse) => this.handleError(error)
                    )
                )
            )
        )
    );
    readonly update = this.effect<{ id: number; localization: Localization }>((params$) =>
        params$.pipe(
            switchMap((params) => this.localizationService.update(params.id, params.localization)),
            switchMap((response) => this.localizationService.get(response)),
            tapResponse(
                (response) => this.updateLocalization(response),
                (error: HttpErrorResponse) => this.handleError(error)
            )
        )
    );
    readonly createLocalization = this.effect<Localization>((params$) =>
        params$.pipe(
            switchMap((localization) =>
                this.authStore.user$.pipe(
                    tap(this.checkUserLoggedIn),
                    filter((user): user is IUser => user !== null),
                    switchMap((user) =>
                        this.localizationService
                            .create(localization, user.id)
                            .pipe(switchMap((response) => this.localizationService.get(response)))
                    )
                )
            ),
            tapResponse(
                (response) => {
                    this.addLocalization(response);
                },
                (error: HttpErrorResponse) => this.handleError(error)
            )
        )
    );
    readonly loadLocalizations = this.effect(($) =>
        $.pipe(
            switchMap(() => this.authStore.user$),
            tap(this.checkUserLoggedIn),
            filter((user): user is IUser => user !== null),
            switchMap((user) =>
                this.localizationService.getManyByUser(user.id).pipe(
                    tapResponse(
                        (response) => this.patchState({ data: response }),
                        (error: HttpErrorResponse) => this.handleError(error)
                    )
                )
            )
        )
    );
    private readonly addLocalization = this.updater((state, localization: Localization) => {
        return { ...state, data: [...(state.data ?? []), localization] };
    });
    private checkUserLoggedIn = (user: IUser | null) => {
        if (user === null) {
            this.messageService.showMessage('Nie jesteś zalogowany!', 'error');
            this.router.navigate(['welcome'], { queryParams: { returnUrl: this.router.routerState.snapshot.url } });

            throwError(new Error('User is not logged in'));
        }
    };
    private handleError = (error: HttpErrorResponse) => {
        this.messageService.showMessage(error.message);
    };
    private readonly deleteLocalization = this.updater((state, id: number) => {
        const localizations = (state.data ?? []).filter((x) => x.id !== id);
        return {
            ...state,
            data: [...localizations],
        };
    });
    private readonly updateLocalization = this.updater((state, localization: Localization) => {
        const localizations = (state.data ?? []).filter((x) => x.id !== localization.id);
        return {
            ...state,
            data: [...localizations, localization],
        };
    });
    constructor(
        private localizationService: LocalizationService,
        private authStore: AuthenticationStore,
        private router: Router,
        private messageService: MessageService
    ) {
        super({} as SettingsMyLocalizationsState);
    }
}
