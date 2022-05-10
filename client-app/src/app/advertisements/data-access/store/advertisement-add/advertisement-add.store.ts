import { AdvertisementDefinition, IItem, Localization } from 'src/app/shared/data-access/models';
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
import { CategoryStore, ItemStore } from 'src/app/shared/data-access/store/';

interface AdvertisementAddState {
    userLocalizations: Localization[];
    advertisementDefinitions: AdvertisementDefinition[];
    itemListing: IItem[];
}

@Injectable()
export class AdvertisementAddStore extends ComponentStore<AdvertisementAddState> {
    readonly itemListing$ = this.itemStore.items$;
    readonly categories$ = this.categoryStore.categories$;
    readonly userLocalizations$ = this.select((state) => state.userLocalizations);
    readonly advertisementDefinitions$ = this.select((state) => state.advertisementDefinitions);

    readonly itemIdChanged = this.effect<IItem>(($) => $);
    readonly descriptionChanged = this.effect<string>(($) => $);
    readonly titleChanged = this.effect<string>(($) => $);

    readonly createItem = this.effect<IItem>((params$) =>
        params$.pipe(
            switchMap((item) =>
                this.authStore.user$.pipe(
                    tap(this.checkUserLoggedIn),
                    filter((user): user is IUser => user !== null),
                    switchMap((user) =>
                        this.itemService
                            .create(item, user.id)
                            .pipe(switchMap((response) => this.itemService.get(response.responseObject)))
                    )
                )
            ),
            tapResponse(
                (response) => {
                    this.addItem(response.responseObject);
                },
                (error: HttpError<Response>) => {
                    this.messageService.showMessage(error.error?.errorMessages[0] ?? '', 'error');
                }
            )
        )
    );

    private readonly addItem = this.updater((state, item: IItem) => {
        return { ...state, itemListing: [...state.itemListing, item] };
    });

    readonly createLocalization = this.effect<Localization>((params$) =>
        params$.pipe(
            switchMap((localization) =>
                this.authStore.user$.pipe(
                    tap(this.checkUserLoggedIn),
                    filter((user): user is IUser => user !== null),
                    switchMap((user) =>
                        this.localizationService
                            .create(localization, user.id)
                            .pipe(switchMap((response) => this.localizationService.get(response.responseObject)))
                    )
                )
            ),
            tapResponse(
                (response) => {
                    this.addLocalization(response.responseObject);
                },
                (error: HttpError<Response>) => {
                    this.messageService.showMessage(error.error?.errorMessages[0] ?? '', 'error');
                }
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
                    this.router.navigate(['advertisements', 'details', response.responseObject]);
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
    readonly loadCategories = this.categoryStore.loadCategories;

    readonly loadItemListing = () => this.itemStore.loadItemsForLoggedInUser({ includeImages: true, maxImages: 1 });

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
        private itemStore: ItemStore,
        private authStore: AuthenticationStore,
        private localizationService: LocalizationService,
        private advertisementDefinitionService: AdvertisementDefinitionService,
        private router: Router,
        private messageService: MessageService,
        private advertisementService: AdvertisementService,
        private itemService: ItemService,
        private categoryStore: CategoryStore
    ) {
        super(<AdvertisementAddState>{});
    }
}
