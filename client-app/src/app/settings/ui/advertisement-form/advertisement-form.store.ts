import { Advertisement, AdvertisementDefinition, Category, Localization, User } from '@core/models/';
import { GenericState } from '@core/types/.';
import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { switchMap, tap, filter, withLatestFrom } from 'rxjs/operators';
import { AdvertisementDefinitionService, AdvertisementService, CategoryService, LocalizationService } from '@core/services/.';
import { HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { selectUser } from '@core/stores/authentication';
import { MessageService } from 'primeng/api';
import { HttpHelperMethods } from '@shared/utils/http-utils';
import { addToList, updateOnList } from '../../feature/settings-advertisements/store';
import { FileUpload } from 'primeng/fileupload';

export type FormMode = 'edit' | 'create';

interface AdvertisementFormState extends GenericState<Advertisement> {
    categories: Category[] | null;
    localizations: Localization[] | null;
    definitions: AdvertisementDefinition[] | null;
    mode: FormMode;
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

    protected user$ = this.store.select(selectUser).pipe(
        filter((user): user is User => {
            if (user) return true;
            this.patchState({ error: 'Nie jesteś zalogowany!' });
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Nie jesteś zalogowany' });
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
        super({} as AdvertisementFormState);
    }
    readonly loadAdvertisement = this.effect<{ id: number }>(($) =>
        $.pipe(
            tap(() => this.patchState({ status: 'loading', error: null, data: null })),
            switchMap(({ id }) =>
                this.advertisementService.get(id, {
                    includeCategory: true,
                    includeDefinition: true,
                    includeImages: true,
                    includeLocalization: true,
                })
            ),
            tapResponse(
                (response) => {
                    this.patchState({ data: response, status: 'success' });
                },
                (error: HttpErrorResponse) => {
                    this.handleError(error);
                }
            )
        )
    );
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
                    this.handleError(error);
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
                    this.handleError(error);
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
                    this.handleError(error);
                }
            )
        )
    );

    readonly createAdvertisement = this.effect<{ advertisement: Advertisement }>((params$) =>
        params$.pipe(
            tap(() => this.patchState({ status: 'loading' })),
            withLatestFrom(this.user$),
            switchMap(([{ advertisement }, user]) =>
                this.advertisementService.create(advertisement, user.id).pipe(
                    tapResponse(
                        (response) => {
                            this.patchState({
                                data: { ...advertisement, id: response },
                                status: 'success',
                                mode: 'edit',
                            });
                            this.store.dispatch(addToList({ id: response }));
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Sukces',
                                detail: 'Pomyślnie zapisano ogłoszenie!',
                            });
                        },
                        (error: HttpErrorResponse) => {
                            this.handleError(error);
                        }
                    )
                )
            )
        )
    );

    readonly updateAdvertisement = this.effect<{ advertisement: Advertisement }>((params$) =>
        params$.pipe(
            tap(() => this.patchState({ status: 'loading' })),
            withLatestFrom(this.advertisement$),
            switchMap(([{ advertisement }, oldAdvertisement]) =>
                this.advertisementService.update(oldAdvertisement!.id, { ...oldAdvertisement, ...advertisement }).pipe(
                    tapResponse(
                        (response) => {
                            this.patchState({
                                data: { ...oldAdvertisement, ...advertisement, id: response },
                                status: 'success',
                            });
                            this.store.dispatch(updateOnList({ id: response }));
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Sukces',
                                detail: 'Pomyślnie uaktualniono ogłoszenie!',
                            });
                        },
                        (error: HttpErrorResponse) => {
                            this.handleError(error);
                        }
                    )
                )
            )
        )
    );

    readonly uploadImages = this.effect<{ images: File[]; fileUpload: FileUpload }>((params$) =>
        params$.pipe(
            withLatestFrom(this.advertisement$, this.mode$),
            filter(([_, advertisement, mode]) => {
                if (mode === 'edit' && advertisement?.id) return true;
                this.messageService.add({
                    severity: 'error',
                    summary: 'Błąd',
                    detail: 'Przed dodaniem zdjęć należy zapisać ogłoszenie!',
                });
                return false;
            }),
            switchMap(([{ images, fileUpload }, advertisement]) =>
                this.advertisementService.uploadImages(advertisement!.id, images).pipe(
                    tapResponse(
                        (event) => {
                            if (HttpHelperMethods.isHttpProgressEvent(event)) {
                                console.log('subscribe na uploadzie', Math.round((100 * event.loaded) / (event.total ?? 1)));
                            } else if (HttpHelperMethods.isHttpResponse(event)) {
                                console.log('subscribe JUZ PO', event);
                                this.patchState((state) => ({
                                    data: {
                                        ...state.data,
                                        images: [...(state.data?.images ?? []), ...(event.body ?? [])],
                                    } as Advertisement,
                                }));
                                this.store.dispatch(updateOnList({ id: advertisement!.id }));
                                fileUpload.clear();
                                this.messageService.add({
                                    severity: 'success',
                                    summary: 'Sukces',
                                    detail: 'Pomyślnie zuploadowano zdjęcia!',
                                });
                            }
                        },
                        (error: HttpErrorResponse) => {
                            this.handleError(error);
                        }
                    )
                )
            )
        )
    );

    readonly deleteImage = this.effect<number>((params$) =>
        params$.pipe(
            tap(() => this.patchState({ status: 'loading' })),
            switchMap((id) =>
                this.advertisementService.deleteImage(id).pipe(
                    tapResponse(
                        () => {
                            this.patchState((state) => ({
                                status: 'success',
                                data: { ...state.data, images: state.data?.images.filter((x) => x.id !== id) } as Advertisement,
                            }));
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Sukces',
                                detail: 'Pomyślnie usunięto zdjęcie!',
                            });
                        },
                        (error: HttpErrorResponse) => {
                            this.handleError(error);
                        }
                    )
                )
            )
        )
    );

    readonly setMainImage = this.effect<number>((params$) =>
        params$.pipe(
            tap(() => this.patchState({ status: 'loading' })),
            switchMap((id) =>
                this.advertisementService.setMainImage(id).pipe(
                    withLatestFrom(this.advertisement$),
                    tapResponse(
                        ([_, advertisement]) => {
                            this.patchState((state) => ({
                                status: 'success',
                                data: {
                                    ...state.data,
                                    images: state.data?.images.map((value) =>
                                        value.id !== id ? { ...value, main: false } : { ...value, main: true }
                                    ),
                                } as Advertisement,
                            }));
                            this.store.dispatch(updateOnList({ id: advertisement!.id }));
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Sukces',
                                detail: 'Pomyślnie ustawiono zdjęcie główne!',
                            });
                        },
                        (error: HttpErrorResponse) => {
                            this.handleError(error);
                        }
                    )
                )
            )
        )
    );
    readonly setMode = this.updater<{ mode: FormMode }>((state, { mode }) => {
        return { ...state, mode: mode };
    });
    private handleError = (error: HttpErrorResponse) => {
        this.patchState({ error: error.error, status: 'error' });
        this.messageService.add({ severity: 'error', summary: 'Błąd', detail: error.error });
    };
}
