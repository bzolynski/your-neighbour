import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AuthenticationService } from '@core/services/.';
import { signIn, signInError, signInSuccess, signUp, signUpError, signUpSuccess } from './authentication.actions';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationEffects {
    constructor(
        private actions$: Actions,
        private authenticationService: AuthenticationService,
        private messageService: MessageService,
        private router: Router
    ) {}

    signIn$ = createEffect(() =>
        this.actions$.pipe(
            ofType(signIn),
            switchMap(({ login, password }) => this.authenticationService.login(login, password)),
            map((user) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Sukces',
                    detail: `Zalogowano pomyślnie!`,
                });
                this.router.navigate(['..']);
                return signInSuccess({ user });
            }),
            catchError((error: HttpErrorResponse) => of(signInError({ error: error.error ?? error.message })))
        )
    );
    signUp$ = createEffect(() =>
        this.actions$.pipe(
            ofType(signUp),
            switchMap(({ email, password, confirmPassword }) =>
                this.authenticationService.register({ email, password, confirmPassword })
            ),
            map(() => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Sukces',
                    detail: `Zalogowano pomyślnie!`,
                });
                this.router.navigate(['..']);
                return signUpSuccess();
            }),
            catchError((error: HttpErrorResponse) => of(signUpError({ error: error.error ?? error.message })))
        )
    );
}
