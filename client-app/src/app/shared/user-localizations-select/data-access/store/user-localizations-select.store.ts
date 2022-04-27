import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { throwError } from 'rxjs';
import { filter, mergeMap, switchMap, tap } from 'rxjs/operators';
import { HttpError, Response } from 'src/app/modules/core/models';
import { LocalizationService } from 'src/app/modules/core/services/localization.service';
import { MessageService } from 'src/app/modules/core/services/message.service';
import { AuthenticationStore } from 'src/app/shared/authentication/data-access';
import { GenericState, ILocalization } from 'src/app/shared/data-access/models';
import { IUser } from 'src/app/shared/data-access/models/api/user';

type UserLocalizationsState = GenericState<ILocalization[]>;

@Injectable()
export class UserLocalizationsStore extends ComponentStore<UserLocalizationsState> {
    readonly isLoading$ = this.select((state) => state.status === 'loading');
    readonly localizations$ = this.select((state) => state.data);

    private updateImages = this.updater((state, localization: ILocalization) => {
        return {
            ...state,
            data: [...(state.data ?? []), localization],
        };
    });

    readonly addLocalization = this.effect<ILocalization>((params$) =>
        params$.pipe(
            mergeMap((localization) =>
                this.authStore.user$.pipe(
                    tap(this.checkUserLoggedIn),
                    filter((user): user is IUser => user !== null),
                    switchMap((user) =>
                        this.localizationService.create(localization, user.id).pipe(
                            tapResponse(
                                (response) => {
                                    this.updateImages(response.responseObject);
                                },
                                (error: HttpError<Response>) => {
                                    this.patchState({ status: 'error', error: error.error?.errorMessages[0] });
                                }
                            )
                        )
                    )
                )
            )
        )
    );

    readonly loadUserLocalizations = this.effect(($) =>
        $.pipe(
            tap(() => {
                this.patchState({ status: 'loading' });
            }),
            switchMap(() => this.authStore.user$),
            tap(this.checkUserLoggedIn),
            filter((user): user is IUser => user !== null),
            switchMap((user) =>
                this.localizationService.getManyByUser(user.id).pipe(
                    tapResponse(
                        (response) => {
                            this.patchState({ status: 'success', data: response.responseObject });
                        },
                        (error: HttpError<Response>) => {
                            this.patchState({ status: 'error', error: error.error?.errorMessages[0] });
                        }
                    )
                )
            )
        )
    );
    private checkUserLoggedIn = (user: IUser | null) => {
        if (user === null) {
            this.messageService.showMessage('Nie jesteś zalogowany!', 'error');
            this.router.navigate(['welcome'], { queryParams: { returnUrl: this.router.routerState.snapshot.url } });
            this.patchState({ status: 'error', error: 'Użytkownik nie zalogowany' });

            throwError(new Error('User is not logged in'));
        }
    };

    constructor(
        private authStore: AuthenticationStore,
        private localizationService: LocalizationService,
        private router: Router,
        private messageService: MessageService
    ) {
        super(<UserLocalizationsState>{});
    }
}
