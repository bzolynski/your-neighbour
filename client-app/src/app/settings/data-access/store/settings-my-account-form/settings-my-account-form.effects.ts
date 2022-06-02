import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, throwError } from 'rxjs';
import { catchError, filter, map, switchMap, tap } from 'rxjs/operators';
import { MessageService } from 'src/app/modules/core/services/message.service';
import { AuthenticationStore } from 'src/app/shared/authentication/data-access';
import { UserService } from 'src/app/shared/data-access/api';
import { IUser } from 'src/app/shared/data-access/models';
import {
    loadUser,
    loadUserError,
    loadUserSuccess,
    updateUser,
    updateUserError,
    updateUserSuccess,
} from './settings-my-account-form.actions';
@Injectable()
export class SettingsMyAccountFormEffects {
    constructor(
        private actions$: Actions,
        private userService: UserService,
        private authStore: AuthenticationStore,
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

    updateUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateUser),
            switchMap(({ id, user }) =>
                this.userService.update(id, user).pipe(
                    map(() => updateUserSuccess({ user: { ...user, id: id } })),
                    catchError((error: HttpErrorResponse) => of(updateUserError({ error: error.error ?? error.message })))
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
