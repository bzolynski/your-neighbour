import { GenericState, ICategory } from 'src/app/shared/data-access/models';
import { Advertisement } from '../../models/advertisement.model';
import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { switchMap, tap } from 'rxjs/operators';
import { HttpError, Response } from 'src/app/modules/core/models';
import { AdvertisementService } from '..';
import { CategoryService } from 'src/app/modules/core/services';

export type ListViewType = 'list' | 'card';

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

    readonly loadAdvertisements = this.effect(($) =>
        $.pipe(
            tap(() => this.patchState({ status: 'loading', error: undefined, data: undefined })),
            switchMap(() =>
                this.advertisementService
                    .getMany({
                        includeCategory: true,
                        // TODO: turn images on
                        includeImages: false,
                        maxImages: 1,
                        includeDefinition: true,
                        includeLocalization: true,
                        includeUser: true,
                    })
                    .pipe(
                        tapResponse(
                            (response) => {
                                this.patchState({ status: 'success', data: response.responseObject });
                            },
                            (error: HttpError<Response>) => {
                                this.patchState({ status: 'error', error: error.error?.errorMessages[0] ?? '' });
                            }
                        )
                    )
            )
        )
    );
    readonly loadCategory = this.effect<number | undefined>((params$) =>
        params$.pipe(
            tap(() => this.patchState({ activeCategoryLoading: true, activeCategory: undefined })),
            switchMap((categoryId) =>
                categoryId
                    ? this.categoryService.get(categoryId, { includeChildren: true, includeParent: true })
                    : this.categoryService.getRoot({ includeChildren: true, includeParent: true })
            ),
            tapResponse(
                (response) => {
                    console.log(response);

                    this.patchState({ activeCategoryLoading: false, activeCategory: response.responseObject });
                },
                (error: HttpError<Response>) => {
                    this.patchState({ activeCategoryLoading: false, error: error.error?.errorMessages[0] ?? '' });
                }
            )
        )
    );
    constructor(private advertisementService: AdvertisementService, private categoryService: CategoryService) {
        super(<AdvertisementListState>{ listViewType: 'list' });
    }
}
