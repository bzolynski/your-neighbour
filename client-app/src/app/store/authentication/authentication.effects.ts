import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, of, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/modules/core/authentication/authentication.service';
import { ResponseStatus } from 'src/app/modules/core/models';
import { signIn, signInError, signInSuccess } from './authentication.action';

@Injectable()
export class AuthenticationEffects {
    constructor(private actions$: Actions, private authenticationService: AuthenticationService) {}

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
}
