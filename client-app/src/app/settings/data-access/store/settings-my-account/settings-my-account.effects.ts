import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, throwError } from 'rxjs';
import { catchError, filter, map, switchMap, tap } from 'rxjs/operators';
import { LocalizationService } from 'src/app/modules/core/services/localization.service';
import { MessageService } from 'src/app/modules/core/services/message.service';
import { AuthenticationStore } from 'src/app/shared/authentication/data-access';
import { IUser, Localization } from 'src/app/shared/data-access/models';
import {
    createLocalization,
    createLocalizationError,
    createLocalizationSuccess,
    deleteLocalization,
    deleteLocalizationError,
    deleteLocalizationSuccess,
    loadLocalizations,
    loadLocalizationsError,
    loadLocalizationsSuccess,
    loadUser,
    loadUserError,
    loadUserSuccess,
    updateLocalization,
    updateLocalizationError,
    updateLocalizationSuccess,
} from './settings-my-account.actions';

@Injectable()
export class SettingsMyAccountEffects {
    constructor(
        private actions$: Actions,
        private authStore: AuthenticationStore,
        private localizationService: LocalizationService,
        private messageService: MessageService,
        private router: Router
    ) {}

    loadUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadUser),
            switchMap(() =>
                this.authStore.user$.pipe(
                    tap(this.checkUserLoggedIn),
                    filter((user): user is IUser => user != null),
                    map((user) => loadUserSuccess({ user: user })),
                    catchError((error: HttpErrorResponse) => of(loadUserError({ error: error.error ?? error.message })))
                )
            )
        )
    );
    loadLocalizations$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadLocalizations),
            switchMap(() => this.authStore.user$),
            tap(this.checkUserLoggedIn),
            filter((user): user is IUser => user !== null),
            switchMap((user) =>
                this.localizationService.getManyByUser(user.id).pipe(
                    map((localizations) => loadLocalizationsSuccess({ localizations: localizations })),
                    catchError((error: HttpErrorResponse) => of(loadLocalizationsError({ error: error.error ?? error.message })))
                )
            )
        )
    );

    createLocalization$ = createEffect(() =>
        this.actions$.pipe(
            ofType(createLocalization),
            switchMap(({ localization }) =>
                this.authStore.user$.pipe(
                    tap(this.checkUserLoggedIn),
                    filter((user): user is IUser => user !== null),
                    switchMap((user) => this.localizationService.create(localization, user.id)),
                    map((id) => ({ ...localization, id: id } as Localization))
                )
            ),
            map((localization) => createLocalizationSuccess({ localization: localization })),
            catchError((error: HttpErrorResponse) => of(createLocalizationError({ error: error.error ?? error.message })))
        )
    );
    updateLocalization$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateLocalization),
            switchMap(({ id, localization }) =>
                this.localizationService.update(id, localization).pipe(map(() => ({ ...localization, id: id } as Localization)))
            ),
            map((localization) => updateLocalizationSuccess({ localization: localization })),
            catchError((error: HttpErrorResponse) => of(updateLocalizationError({ error: error.error ?? error.message })))
        )
    );

    deleteLocalization$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteLocalization),
            switchMap(({ id }) =>
                this.localizationService.delete(id).pipe(
                    map(() => deleteLocalizationSuccess({ id: id })),
                    catchError((error: HttpErrorResponse) => of(deleteLocalizationError({ error: error.error ?? error.message })))
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
}
