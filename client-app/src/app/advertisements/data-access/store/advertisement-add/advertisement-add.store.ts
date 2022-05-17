import { AdvertisementDefinition, IItem, Localization } from 'src/app/shared/data-access/models';
import { Advertisement } from '../../models/advertisement.model';
import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { throwError } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import { IUser } from 'src/app/shared/data-access/models/api/user';
import { AuthenticationStore } from 'src/app/shared/authentication/data-access';
import { LocalizationService } from 'src/app/modules/core/services/localization.service';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/modules/core/services/message.service';
import { AdvertisementDefinitionService } from 'src/app/shared/data-access/api';
import { AdvertisementService } from '../advertisement.service';
import { HttpErrorResponse } from '@angular/common/http';

interface AdvertisementAddState {
    userLocalizations: Localization[];
    advertisementDefinitions: AdvertisementDefinition[];
}

@Injectable()
export class AdvertisementAddStore extends ComponentStore<AdvertisementAddState> {
    readonly userLocalizations$ = this.select((state) => state.userLocalizations);
    readonly advertisementDefinitions$ = this.select((state) => state.advertisementDefinitions);

    readonly itemIdChanged = this.effect<IItem>(($) => $);
    readonly descriptionChanged = this.effect<string>(($) => $);
    readonly titleChanged = this.effect<string>(($) => $);
    readonly createLocalization = this.effect<Localization>((params$) =>
        params$.pipe(
            switchMap((localization) =>
                this.authStore.user$.pipe(
                    tap(this.checkUserLoggedIn),
                    filter((user): user is IUser => user !== null),
                    switchMap((user) =>
                        this.localizationService
                            .create(localization, user.id)
                            .pipe(switchMap((response) => this.localizationService.get(response)))
                    )
                )
            ),
            tapResponse(
                (response) => {
                    this.addLocalization(response);
                },
                (error: HttpErrorResponse) => this.handleError(error)
            )
        )
    );

    private readonly addLocalization = this.updater((state, localization: Localization) => {
        return { ...state, userLocalizations: [...state.userLocalizations, localization] };
    });

    readonly createAdvertisement = this.effect<Advertisement>((params$) =>
        params$.pipe(
            switchMap((advertisement) =>
                this.authStore.user$.pipe(
                    tap(this.checkUserLoggedIn),
                    filter((user): user is IUser => user !== null),
                    switchMap((user) => this.advertisementService.create(advertisement, user.id))
                )
            ),
            tapResponse(
                (response) => {
                    this.router.navigate(['advertisements', 'details', response]);
                },
                (error: HttpErrorResponse) => this.handleError(error)
            )
        )
    );
    readonly loadAdvertisementDefinitions = this.effect(($) =>
        $.pipe(
            switchMap(() =>
                this.advertisementDefinitionService.getMany().pipe(
                    tapResponse(
                        (response) => {
                            this.patchState({ advertisementDefinitions: response });
                        },
                        (error: HttpErrorResponse) => this.handleError(error)
                    )
                )
            )
        )
    );
    readonly loadUserLocalizations = this.effect(($) =>
        $.pipe(
            switchMap(() => this.authStore.user$),
            tap(this.checkUserLoggedIn),
            filter((user): user is IUser => user !== null),
            switchMap((user) =>
                this.localizationService.getManyByUser(user.id).pipe(
                    tapResponse(
                        (response) => {
                            this.patchState({ userLocalizations: response });
                        },
                        (error: HttpErrorResponse) => this.handleError(error)
                    )
                )
            )
        )
    );
    private checkUserLoggedIn = (user: IUser | null) => {
        if (user === null) {
            this.messageService.showMessage('Nie jesteś zalogowany!', 'error');
            this.router.navigate(['welcome'], { queryParams: { returnUrl: this.router.routerState.snapshot.url } });

            throwError(new Error('User is not logged in'));
        }
    };

    private handleError = (error: HttpErrorResponse) => {
        this.messageService.showMessage(error.message);
    };

    constructor(
        private authStore: AuthenticationStore,
        private localizationService: LocalizationService,
        private advertisementDefinitionService: AdvertisementDefinitionService,
        private router: Router,
        private messageService: MessageService,
        private advertisementService: AdvertisementService
    ) {
        super(<AdvertisementAddState>{});
    }
}
