import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { map, switchMap, tap } from 'rxjs/operators';
import { GenericState } from 'src/app/shared/data-access/models';
import { IUser } from 'src/app/shared/data-access/models/api/user.model';
import { AuthenticationService } from './authentication.service';

const LOCALSTORAGE_USER = 'user';

export type AuthenticationState = GenericState<IUser>;

@Injectable({
    providedIn: 'root',
})
export class AuthenticationStore extends ComponentStore<AuthenticationState> {
    readonly user$ = this.select((state) => state.data).pipe(
        map((user) => {
            if (user) return user;
            user = this.getFromLocalStorage();
            if (!user) return null;
            this.patchState({ data: user });
            return user;
        })
    );
    readonly isLoading$ = this.select((state) => state.status === 'loading');
    readonly error$ = this.select((state) => state.error);

    readonly signIn = this.effect<{ login: string; password: string }>((params$) =>
        params$.pipe(
            tap(() => {
                this.patchState({ status: 'loading', error: null });
            }),
            switchMap(({ login, password }) =>
                this.authenticationService.login(login, password).pipe(
                    tapResponse(
                        (response) => {
                            this.saveToLocalStorage(response);
                            this.patchState({ status: 'success', data: response });
                        },
                        (error: HttpErrorResponse) => {
                            this.removeFromLocalStorage();
                            this.patchState({ status: 'error', error: error.message });
                        }
                    )
                )
            )
        )
    );

    readonly signOut = this.effect(($) =>
        $.pipe(
            tap(() => {
                this.removeFromLocalStorage();
                this.patchState({ status: 'pending', error: null, data: null });
            })
        )
    );

    private getFromLocalStorage = (): IUser | null => {
        const jsonUser = localStorage.getItem(LOCALSTORAGE_USER);
        if (!jsonUser) return null;
        return JSON.parse(jsonUser);
    };
    private saveToLocalStorage = (user: IUser) => {
        localStorage.setItem(LOCALSTORAGE_USER, JSON.stringify(user));
    };
    private removeFromLocalStorage = () => {
        localStorage.removeItem(LOCALSTORAGE_USER);
    };
    constructor(private authenticationService: AuthenticationService) {
        super(<AuthenticationState>{});
    }
}
