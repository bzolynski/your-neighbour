import { GenericState, ICategory } from 'src/app/shared/data-access/models';
import { Advertisement } from '../../models/advertisement.model';
import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { switchMap, tap } from 'rxjs/operators';
import { AdvertisementService } from '..';
import { CategoryService } from 'src/app/modules/core/services';
import { Params } from '@angular/router';
import { CategoryStore } from 'src/app/shared/data-access/store';
import { ListViewType } from 'src/app/shared/ui/list-container/list-container.component';
import { HttpErrorResponse } from '@angular/common/http';

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
    readonly categories$ = this.categoryStore.categories$;

    readonly loadCategories = this.categoryStore.loadCategories;

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
                            // TODO: turn images on
                            includeImages: true,
                            maxImages: 1,
                            includeDefinition: true,
                            includeLocalization: true,
                            includeUser: true,
                            search: params.searchQuery ?? '',
                        })
                        .pipe(
                            tapResponse(
                                (response) => {
                                    this.patchState({ status: 'success', data: response });
                                },
                                (error: HttpErrorResponse) => {
                                    this.patchState({ status: 'error', error: error.message });
                                }
                            )
                        )
                )
            )
    );
    constructor(
        private advertisementService: AdvertisementService,
        private categoryService: CategoryService,
        private categoryStore: CategoryStore
    ) {
        super(<AdvertisementListState>{ listViewType: 'list' });
    }
}
