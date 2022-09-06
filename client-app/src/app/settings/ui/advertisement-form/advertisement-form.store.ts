import { Advertisement, AdvertisementDefinition, Category, Localization, User } from '@models/';
import { GenericState } from '@app-types/.';
import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { switchMap, tap, filter, withLatestFrom } from 'rxjs/operators';
import { AdvertisementDefinitionService, AdvertisementService, CategoryService, LocalizationService } from '@services/.';
import { HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { selectUser } from '@stores/authentication';
import { MessageService } from 'primeng/api';
import { HttpHelperMethods } from '@utils/http-utils';

export type FormMode = 'edit' | 'create';

interface AdvertisementFormState extends GenericState<Advertisement> {
    categories: Category[] | null;
    localizations: Localization[] | null;
    definitions: AdvertisementDefinition[] | null;
    activeTab: number;
    mode: FormMode;
    creationFormSubmited: boolean;
}

@Injectable()
export class AdvertisementFormStore extends ComponentStore<AdvertisementFormState> {
    readonly mode$ = this.select((state) => state.mode);
    readonly advertisement$ = this.select((state) => state.data);
    readonly status$ = this.select((state) => state.status);
    readonly error$ = this.select((state) => state.error);
    readonly categories$ = this.select((state) => state.categories);
    readonly localizations$ = this.select((state) => state.localizations);
    readonly definitions$ = this.select((state) => state.definitions);
    readonly activeTab$ = this.select((state) => state.activeTab);
    readonly creationFormSubmited$ = this.select((state) => state.creationFormSubmited);

    protected user$ = this.store.select(selectUser).pipe(
        filter((user): user is User => {
            if (user) return true;
            this.patchState({ error: 'Nie jesteś zalogowany!' });
            return false;
        })
    );
    constructor(
        private store: Store,
        private advertisementService: AdvertisementService,
        private categoryService: CategoryService,
        private localizationService: LocalizationService,
        private advertisementDefinitionService: AdvertisementDefinitionService,
        private messageService: MessageService
    ) {
        super({ activeTab: 0, creationFormSubmited: false } as AdvertisementFormState);
    }

    readonly loadLocalizations = this.effect(($) =>
        $.pipe(
            tap(() => this.patchState({ localizations: null })),
            switchMap(() => this.user$),
            filter((user): user is User => {
                if (user) return true;
                this.patchState({ error: 'Nie jesteś zalogowany!' });
                return false;
            }),
            switchMap((user) => this.localizationService.getManyByUser(user.id)),
            tapResponse(
                (response) => {
                    this.patchState({ localizations: response });
                },
                (error: HttpErrorResponse) => {
                    this.patchState({ error: error.message });
                }
            )
        )
    );
    readonly loadDefinitions = this.effect(($) =>
        $.pipe(
            tap(() => this.patchState({ definitions: null })),
            switchMap(() => this.advertisementDefinitionService.getMany()),
            tapResponse(
                (response) => {
                    this.patchState({ definitions: response });
                },
                (error: HttpErrorResponse) => {
                    this.patchState({ error: error.message });
                }
            )
        )
    );
    readonly loadCategories = this.effect(($) =>
        $.pipe(
            tap(() => this.patchState({ categories: null })),
            switchMap(() => this.categoryService.getMany()),
            tapResponse(
                (response) => {
                    this.patchState({ categories: response });
                },
                (error: HttpErrorResponse) => {
                    this.patchState({ error: error.message });
                }
            )
        )
    );

    readonly createAdvertisement = this.effect<{ advertisement: Advertisement }>((params$) =>
        params$.pipe(
            withLatestFrom(this.user$),
            switchMap(([{ advertisement }, user]) =>
                this.advertisementService.create(advertisement, user.id).pipe(
                    tapResponse(
                        (response) => {
                            this.patchState({
                                data: { ...advertisement, id: response },
                                status: 'success',
                                activeTab: 1,
                                creationFormSubmited: true,
                            });
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Sukces',
                                detail: 'Pomyślnie zapisano ogłoszenie!',
                            });
                        },
                        (error: HttpErrorResponse) => {
                            this.patchState({ error: error.message });
                        }
                    )
                )
            )
        )
    );

    readonly updateAdvertisement = this.effect<{ advertisement: Advertisement }>((params$) =>
        params$.pipe(
            switchMap(({ advertisement }) =>
                this.advertisementService.update(advertisement.id, advertisement).pipe(
                    tapResponse(
                        (response) => {
                            this.patchState({
                                data: { ...advertisement, id: response },
                                status: 'success',
                                activeTab: 1,
                            });
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Sukces',
                                detail: 'Pomyślnie zapisano ogłoszenie!',
                            });
                        },
                        (error: HttpErrorResponse) => {
                            this.patchState({ error: error.message });
                        }
                    )
                )
            )
        )
    );
    readonly uploadimages = this.effect<{ images: File[] }>((params$) =>
        params$.pipe(
            withLatestFrom(this.advertisement$, this.mode$, this.creationFormSubmited$),
            filter(([_, advertisement, mode, creationFormSubmited]) => {
                if ((mode === 'edit' || creationFormSubmited) && advertisement?.id) return true;
                this.messageService.add({
                    severity: 'error',
                    summary: 'Błąd',
                    detail: 'Przed dodaniem zdjęć należy zapisać ogłoszenie!',
                });
                return false;
            }),
            switchMap(([{ images }, advertisement]) =>
                this.advertisementService.uploadImages(advertisement!.id, images).pipe(
                    tapResponse(
                        (event) => {
                            if (HttpHelperMethods.isHttpProgressEvent(event)) {
                                console.log('subscribe na uploadzie', Math.round((100 * event.loaded) / (event.total ?? 1)));
                            } else if (HttpHelperMethods.isHttpResponse(event)) {
                                console.log('subscribe JUZ PO', event);
                                this.messageService.add({
                                    severity: 'success',
                                    summary: 'Sukces',
                                    detail: 'Pomyślnie zuploadowano zdjęcia!',
                                });
                            }
                        },
                        (error: HttpErrorResponse) => {
                            this.patchState({ error: error.message });
                        }
                    )
                )
            )
        )
    );
    readonly setMode = this.updater<{ mode: FormMode }>((state, { mode }) => {
        return { ...state, mode: mode };
    });
    readonly nextTab = this.updater((state) => {
        return { ...state, activeTab: state.activeTab === 2 ? state.activeTab : state.activeTab + 1 };
    });
    readonly previousTab = this.updater((state) => {
        return { ...state, activeTab: state.activeTab === 0 ? state.activeTab : state.activeTab - 1 };
    });
}
