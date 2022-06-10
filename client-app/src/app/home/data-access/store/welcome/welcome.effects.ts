import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AuthenticationStore } from 'src/app/shared/authentication/data-access';
import { loadAdvertisementError, loadAdvertisementSuccess, login } from './welcome.actions';

@Injectable()
export class AdvertisementDetailsEffects {
    constructor(private actions$: Actions, private authenticationStore: AuthenticationStore) {}
    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(login),
            switchMap(({ login, password }) => this.authenticationStore.signIn({ login, password })),
            map((advertisement) => loadAdvertisementSuccess({ advertisement: advertisement })),
            catchError((error: HttpErrorResponse) => of(loadAdvertisementError({ error: error.error ?? error.message })))
        )
    );
}
