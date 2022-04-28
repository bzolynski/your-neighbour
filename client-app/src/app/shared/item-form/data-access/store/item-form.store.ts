import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { HttpError, Response } from 'src/app/modules/core/models';
import { CategoryService } from 'src/app/modules/core/services';
import { ItemService } from 'src/app/modules/core/services/item.service';
import { GenericStoreStatus, ICategory, IImage, IItemDetails } from 'src/app/shared/data-access/models';

interface ItemFormState {
    itemDetailsStatus: GenericStoreStatus;
    itemDetails: IItemDetails | null;
    itemDetailsError: string | null;

    itemImagesStatus: GenericStoreStatus;
    itemImages: IImage[] | null;
    itemImagesError: string | null;

    categoriesStatus: GenericStoreStatus;
    categories: ICategory[] | null;
    categoriesError: string | null;
}

@Injectable()
export class ItemFormStore extends ComponentStore<ItemFormState> {
    readonly itemDetailsLoading$ = this.select((state) => state.itemDetailsStatus === 'loading');
    readonly itemImagesLoading$ = this.select((state) => state.itemImagesStatus === 'loading');
    readonly categoriesLoading$ = this.select((state) => state.categoriesStatus === 'loading');

    readonly itemDetails$ = this.select((state) => state.itemDetails);
    readonly itemImages$ = this.select((state) => state.itemImages);
    readonly categories$ = this.select((state) => state.categories);

    readonly addImage = this.effect<IImage>((params$) =>
        params$.pipe(
            tap((item) => {
                this.updateImages(item);
            })
        )
    );

    private updateImages = this.updater((state, image: IImage) => {
        if (state.itemImages?.find((img) => img.dataUrl === image.dataUrl && img.name === image.name)) return state;
        return {
            ...state,
            itemImages: [...(state.itemImages ?? []), image],
        };
    });

    readonly removeImage = this.updater((state, image: IImage) => {
        return {
            ...state,
            itemImages: [...(state.itemImages?.filter((x) => x != image) ?? [])],
        };
    });
    readonly loadItemImages = this.effect<{ itemId: number | null }>((params$) =>
        params$.pipe(
            map(({ itemId }) => itemId),
            tap(() => {
                this.patchState({ itemImagesStatus: 'pending', itemImagesError: null, itemImages: null });
            }),
            filter((itemId): itemId is number => itemId !== null),
            tap(() => {
                this.patchState({ itemImagesStatus: 'loading' });
            }),
            switchMap((itemId) =>
                this.itemService.getImagesByItem(itemId).pipe(
                    tapResponse(
                        (response) => {
                            this.patchState({ itemImagesStatus: 'success', itemImages: response.responseObject });
                        },
                        (error: HttpError<Response>) => {
                            this.patchState({ itemImagesStatus: 'error', itemImagesError: error.error?.errorMessages[0] });
                        }
                    )
                )
            )
        )
    );

    readonly loadItemDetails = this.effect<{ itemId: number | null }>((params$) =>
        params$.pipe(
            map(({ itemId }) => itemId),
            tap(() => {
                this.patchState({ itemDetailsStatus: 'pending', itemDetailsError: null, itemDetails: null });
            }),
            filter((itemId): itemId is number => itemId !== null),
            tap(() => {
                this.patchState({ itemDetailsStatus: 'loading' });
            }),
            switchMap((itemId) =>
                this.itemService.get(itemId, { includeCategory: true }).pipe(
                    tapResponse(
                        (response) => {
                            this.patchState({ itemDetailsStatus: 'success', itemDetails: response.responseObject });
                        },
                        (error: HttpError<Response>) => {
                            this.patchState({ itemDetailsStatus: 'error', itemDetailsError: error.error?.errorMessages[0] });
                        }
                    )
                )
            )
        )
    );

    readonly loadCategories = this.effect(($) =>
        $.pipe(
            tap(() => {
                this.patchState({ categoriesStatus: 'loading', itemImagesError: null });
            }),
            switchMap(() =>
                this.categoryService.getAll().pipe(
                    tapResponse(
                        (response) => {
                            this.patchState({ categoriesStatus: 'success', categories: response.responseObject });
                        },
                        (error: HttpError<Response>) => {
                            this.patchState({ categoriesStatus: 'error', categoriesError: error.error?.errorMessages[0] });
                        }
                    )
                )
            )
        )
    );

    constructor(private itemService: ItemService, private categoryService: CategoryService) {
        super(<ItemFormState>{});
    }
}
