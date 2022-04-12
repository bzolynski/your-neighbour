import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, of, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { ResponseStatus } from 'src/app/modules/core/models';
import { AuthenticationService } from '../services/authentication.service';
import { signIn, signInError, signInSuccess, signOut, signOutSuccess } from './authentication.action';

@Injectable()
export class AuthenticationEffects {
    constructor(private actions$: Actions, private authenticationService: AuthenticationService, private router: Router) {}

    signIn$ = createEffect(() =>
        this.actions$.pipe(
            ofType(signIn),
            switchMap(({ login, password }) =>
                from(
                    this.authenticationService.login(login, password).pipe(
                        switchMap((resp) => {
                            if (resp.responseStatus === ResponseStatus.error) return throwError(resp);
                            return of(resp);
                        }),
                        map((resp) => resp.responseObject)
                    )
                ).pipe(
                    map((user) => signInSuccess({ user: user })),
                    catchError((error) => of(signInError({ error: error })))
                )
            )
        )
    );

    signOut$ = createEffect(() =>
        this.actions$.pipe(
            ofType(signOut),
            switchMap(() => of(signOutSuccess())),
            tap(() => {
                this.router.navigate(['welcome']);
            })
        )
    );
}
