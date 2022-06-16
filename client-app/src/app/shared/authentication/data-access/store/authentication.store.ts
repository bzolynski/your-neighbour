import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { map, switchMap, tap } from 'rxjs/operators';
import { MessageService } from 'src/app/modules/core/services/message.service';
import { GenericState } from 'src/app/shared/data-access/models';
import { IUser } from 'src/app/shared/data-access/models/api/user.model';
import { StringHelperMethods } from 'src/app/shared/utils/string-utils';
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
    readonly userDetailsFilled$ = this.select((state) => state.data).pipe(
        map(
            (user) =>
                !StringHelperMethods.isNullOrWhiteSpace(user?.firstName) &&
                !StringHelperMethods.isNullOrWhiteSpace(user?.lastName) &&
                !StringHelperMethods.isNullOrWhiteSpace(user?.phoneNumber)
        )
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
                            this.router.navigateByUrl(this.activatedRoute.snapshot.queryParams['returnUrl'] ?? '/');
                            this.messageService.showMessage('Pomyślnie zalogowano', 'success');
                        },
                        (error: HttpErrorResponse) => {
                            this.removeFromLocalStorage();
                            this.handleError(error);
                        }
                    )
                )
            )
        )
    );

    readonly signOut = this.effect(($) =>
        $.pipe(
            switchMap(() => this.authenticationService.logout()),
            tap(() => {
                this.removeFromLocalStorage();
                this.patchState({ status: 'pending', error: null, data: null });
                this.messageService.showMessage('Pomyślnie wylogowano', 'success');
            })
        )
    );

    readonly register = this.effect<{ email: string; password: string; confirmPassword: string }>((params$) =>
        params$.pipe(
            tap(() => {
                this.patchState({ status: 'loading', error: null });
            }),
            switchMap(({ email, password, confirmPassword }) =>
                this.authenticationService.register({ email, password, confirmPassword }).pipe(
                    tapResponse(
                        () => {
                            this.patchState({ status: 'success' });
                            this.messageService.showMessage('Rejestracja przebiegła pomyślnie. Możesz się zalogować!', 'success');
                        },
                        (error: HttpErrorResponse) => this.handleError(error)
                    )
                )
            )
        )
    );
    private handleError = (error: HttpErrorResponse) => {
        this.patchState({ status: 'error', error: error.message });
        this.messageService.showMessage(error.message, 'error');
    };
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
    constructor(
        private authenticationService: AuthenticationService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private messageService: MessageService
    ) {
        super(<AuthenticationState>{});
    }
}
