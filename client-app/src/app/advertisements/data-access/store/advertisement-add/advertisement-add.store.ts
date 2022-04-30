import { GenericState, IItem, Localization } from 'src/app/shared/data-access/models';
import { Advertisement } from '../../models/advertisement.model';
import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { throwError } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import { HttpError, Response } from 'src/app/modules/core/models';
import { IUser } from 'src/app/shared/data-access/models/api/user';
import { AuthenticationStore } from 'src/app/shared/authentication/data-access';
import { LocalizationService } from 'src/app/modules/core/services/localization.service';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/modules/core/services/message.service';

interface AdvertisementAddState extends GenericState<Advertisement> {
    userLocalizations: Localization[];
}

@Injectable()
export class AdvertisementAddStore extends ComponentStore<AdvertisementAddState> {
    readonly userLocalizations$ = this.select((state) => state.userLocalizations);

    readonly itemIdChanged = this.effect<IItem>(($) => $);
    readonly localizationChanged = this.effect<Localization>(($) => $);
    readonly descriptionChanged = this.effect<string>(($) => $);

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
                            this.patchState({ userLocalizations: response.responseObject });
                        },
                        (error: HttpError<Response>) => {
                            this.messageService.showMessage(error.error?.errorMessages[0] ?? '', 'error');
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
        super(<AdvertisementAddState>{});
    }
}
