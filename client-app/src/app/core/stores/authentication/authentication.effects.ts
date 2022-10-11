import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AuthenticationService } from '@core/services/.';
import { signIn, signInError, signInSuccess, signUp, signUpError, signUpSuccess } from './authentication.actions';

@Injectable()
export class AuthenticationEffects {
    constructor(private actions$: Actions, private authenticationService: AuthenticationService) {}

    signIn$ = createEffect(() =>
        this.actions$.pipe(
            ofType(signIn),
            switchMap(({ login, password }) => this.authenticationService.login(login, password)),
            map((user) => signInSuccess({ user })),
            catchError((error: HttpErrorResponse) => of(signInError({ error: error.error ?? error.message })))
        )
    );
    signUp$ = createEffect(() =>
        this.actions$.pipe(
            ofType(signUp),
            switchMap(({ email, password, confirmPassword }) =>
                this.authenticationService.register({ email, password, confirmPassword })
            ),
            map(() => signUpSuccess()),
            catchError((error: HttpErrorResponse) => of(signUpError({ error: error.error ?? error.message })))
        )
    );
}
