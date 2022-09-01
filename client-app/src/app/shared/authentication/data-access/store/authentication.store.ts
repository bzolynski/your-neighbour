import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { MessageService } from 'primeng/api';
import { map, switchMap, tap } from 'rxjs/operators';
import { ChatService } from 'src/app/messages/data-access/api/chat.service';
import { GenericState } from '@utils/types';
import { User } from '@models/';
import { StringHelperMethods } from 'src/app/shared/utils/string-utils';
import { AuthenticationService } from './authentication.service';

const LOCALSTORAGE_USER = 'user';

export type AuthenticationState = GenericState<User>;

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
                            this.messageService.add({ severity: 'success', summary: 'Sukces', detail: 'Pomyślnie zalogowano' });
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
                this.router.navigate(['/']);
                this.chatService.stopConnection();
                this.removeFromLocalStorage();
                this.patchState({ status: 'pending', error: null, data: null });
                this.messageService.add({ severity: 'success', summary: 'Sukces', detail: 'Pomyślnie wylogowano' });
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
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Sukces',
                                detail: 'Rejestracja przebiegła pomyślnie. Możesz się zalogować',
                            });
                        },
                        (error: HttpErrorResponse) => this.handleError(error)
                    )
                )
            )
        )
    );
    readonly updateData = this.effect<{ firstName: string; lastName: string; phoneNumber: string }>((params$) =>
        params$.pipe(
            tap(({ firstName, lastName, phoneNumber }) => {
                this.patchState((state) => ({
                    data: { ...state.data, firstName: firstName, lastName: lastName, phoneNumber: phoneNumber } as User,
                }));
            })
        )
    );

    private handleError = (error: HttpErrorResponse) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error ?? error.message });
    };
    private getFromLocalStorage = (): User | null => {
        const jsonUser = localStorage.getItem(LOCALSTORAGE_USER);
        if (!jsonUser) return null;
        return JSON.parse(jsonUser);
    };
    private saveToLocalStorage = (user: User) => {
        localStorage.setItem(LOCALSTORAGE_USER, JSON.stringify(user));
    };
    private removeFromLocalStorage = () => {
        localStorage.removeItem(LOCALSTORAGE_USER);
    };
    constructor(
        private authenticationService: AuthenticationService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private messageService: MessageService,
        private chatService: ChatService
    ) {
        super(<AuthenticationState>{});
    }
}
