import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MessageService } from 'primeng/api';
import { of, throwError } from 'rxjs';
import { catchError, filter, map, switchMap, tap } from 'rxjs/operators';
import { AuthenticationStore } from 'src/app/shared/authentication/data-access';
import { UserService } from 'src/app/shared/data-access/api';
import { User } from '@models/';
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
                    filter((user): user is User => user != null),
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
                    map(() => {
                        console.log(user);
                        this.authStore.updateData({ ...user });
                        return updateUserSuccess({ user: { ...user, id: id } });
                    }),
                    catchError((error: HttpErrorResponse) => of(updateUserError({ error: error.error ?? error.message })))
                )
            )
        )
    );

    private checkUserLoggedIn = (user: User | null) => {
        if (user === null) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Nie jesteś zalogowany' });
            this.router.navigate(['welcome'], { queryParams: { returnUrl: this.router.routerState.snapshot.url } });

            throwError(new Error('User is not logged in'));
        }
    };
}
