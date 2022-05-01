import { AdvertisementDefinition, ICategory, IItem, Localization } from 'src/app/shared/data-access/models';
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
import { AdvertisementDefinitionService } from 'src/app/shared/data-access/api';
import { AdvertisementService } from '../advertisement.service';
import { ItemService } from 'src/app/modules/core/services/item.service';
import { CategoryService } from 'src/app/modules/core/services';

interface AdvertisementAddState {
    userLocalizations: Localization[];
    advertisementDefinitions: AdvertisementDefinition[];
    itemListing: IItem[];
    categories: ICategory[];
}

@Injectable()
export class AdvertisementAddStore extends ComponentStore<AdvertisementAddState> {
    readonly itemListing$ = this.select((state) => state.itemListing);
    readonly categories$ = this.select((state) => state.categories);
    readonly userLocalizations$ = this.select((state) => state.userLocalizations);
    readonly advertisementDefinitions$ = this.select((state) => state.advertisementDefinitions);

    readonly itemIdChanged = this.effect<IItem>(($) => $);
    readonly descriptionChanged = this.effect<string>(($) => $);

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
                    // TODO: redirect to advertisement page
                    this.router.navigate(['advertisements', response.responseObject]);
                },
                (error: HttpError<Response>) => {
                    this.messageService.showMessage(error.error?.errorMessages[0] ?? '', 'error');
                }
            )
        )
    );
    readonly loadAdvertisementDefinitions = this.effect(($) =>
        $.pipe(
            switchMap(() =>
                this.advertisementDefinitionService.getMany().pipe(
                    tapResponse(
                        (response) => {
                            this.patchState({ advertisementDefinitions: response.responseObject });
                        },
                        (error: HttpError<Response>) => {
                            this.messageService.showMessage(error.error?.errorMessages[0] ?? '', 'error');
                        }
                    )
                )
            )
        )
    );
    readonly loadCategories = this.effect(($) =>
        $.pipe(
            switchMap(() =>
                this.categoryService.getAll().pipe(
                    tapResponse(
                        (response) => {
                            this.patchState({ categories: response.responseObject });
                        },
                        (error: HttpError<Response>) => {
                            this.messageService.showMessage(error.error?.errorMessages[0] ?? '', 'error');
                        }
                    )
                )
            )
        )
    );
    readonly loadItemListing = this.effect(($) =>
        $.pipe(
            switchMap(() => this.authStore.user$),
            tap(this.checkUserLoggedIn),
            filter((user): user is IUser => user !== null),
            switchMap((user) =>
                this.itemService.getByUser(user.id).pipe(
                    tapResponse(
                        (response) => {
                            this.patchState({ itemListing: response.responseObject });
                        },
                        (error: HttpError<Response>) => {
                            this.messageService.showMessage(error.error?.errorMessages[0] ?? '', 'error');
                        }
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

            throwError(new Error('User is not logged in'));
        }
    };

    constructor(
        private authStore: AuthenticationStore,
        private localizationService: LocalizationService,
        private advertisementDefinitionService: AdvertisementDefinitionService,
        private router: Router,
        private messageService: MessageService,
        private advertisementService: AdvertisementService,
        private itemService: ItemService,
        private categoryService: CategoryService
    ) {
        super(<AdvertisementAddState>{});
    }
}
