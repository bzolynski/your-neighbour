import { GenericState, ICategory, IImage } from 'src/app/shared/data-access/models';
import { Advertisement } from '../../models/advertisement.model';
import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { mergeMap, switchMap, tap } from 'rxjs/operators';
import { AdvertisementService } from '..';
import { CategoryService } from 'src/app/modules/core/services';
import { Params } from '@angular/router';
import { ListViewType } from 'src/app/shared/ui/list-container/list-container.component';
import { HttpErrorResponse } from '@angular/common/http';
import { from } from 'rxjs';
import { ItemService } from 'src/app/modules/core/services/item.service';

interface AdvertisementListState extends GenericState<Advertisement[]> {
    listViewType: ListViewType;
    activeCategory: ICategory;
    activeCategoryLoading: boolean;
}

@Injectable()
export class AdvertisementListStore extends ComponentStore<AdvertisementListState> {
    readonly advertisements$ = this.select((state) => state.data);
    readonly isLoading$ = this.select((state) => state.status === 'loading');
    readonly error$ = this.select((state) => state.error);
    readonly listViewType$ = this.select((state) => state.listViewType);
    readonly activeCategory$ = this.select((state) => state.activeCategory);
    readonly activeCategoryLoading$ = this.select((state) => state.activeCategoryLoading);

    readonly changeListViewType = this.updater((state, listViewType: ListViewType) => {
        return { ...state, listViewType: listViewType };
    });

    readonly loadCategoryAndAdvertisements = this.effect<Params>((params$) =>
        params$.pipe(
            tap(() => this.patchState({ activeCategoryLoading: true, activeCategory: undefined })),
            switchMap((params) =>
                (params['id']
                    ? this.categoryService.get(params['id'], { includeChildren: true, includeParent: true })
                    : this.categoryService.getRoot({ includeChildren: true, includeParent: true })
                ).pipe(
                    tapResponse(
                        (response) => {
                            this.patchState({ activeCategoryLoading: false, activeCategory: response });
                            this.loadAdvertisementsByCategory({
                                categoryId: response.id,
                                searchQuery: params['search'],
                            });
                        },
                        (error: HttpErrorResponse) => {
                            this.patchState({ activeCategoryLoading: false, error: error.message });
                        }
                    )
                )
            )
        )
    );
    private readonly loadAdvertisementsByCategory = this.effect<{ categoryId: number; searchQuery: string | undefined }>(
        (params$) =>
            params$.pipe(
                tap(() => this.patchState({ status: 'loading', error: undefined, data: undefined })),
                tap((params) => {
                    console.log(params);
                }),
                switchMap((params) =>
                    this.advertisementService
                        .getManyByCategory(params.categoryId, {
                            includeCategory: true,
                            includeDefinition: true,
                            includeLocalization: true,
                            includeUser: true,
                            includeItem: true,
                            search: params.searchQuery ?? '',
                        })
                        .pipe((response$) =>
                            response$.pipe(
                                tapResponse(
                                    (response) => {
                                        this.patchState({ status: 'success', data: response });
                                    },
                                    (error: HttpErrorResponse) => {
                                        this.patchState({ status: 'error', error: error.message });
                                    }
                                ),
                                switchMap((response) => from(response.map((x) => x.item.id))),
                                mergeMap((id) =>
                                    this.itemService
                                        .getImagesByItem(id, { maxImages: 1 })
                                        .pipe(tap((images) => this.updateImages({ id, images })))
                                )
                            )
                        )
                )
            )
    );

    private readonly updateImages = this.updater((state, params: { id: number; images: IImage[] }) => {
        console.log(params.id, params.images);

        const advertisements = (state.data ?? []).map((value) =>
            value.item.id === params.id ? { ...value, item: { ...value.item, images: params.images } } : value
        );
        return { ...state, data: advertisements };
    });
    constructor(
        private advertisementService: AdvertisementService,
        private categoryService: CategoryService,
        private itemService: ItemService
    ) {
        super(<AdvertisementListState>{ listViewType: 'list' });
    }
}
