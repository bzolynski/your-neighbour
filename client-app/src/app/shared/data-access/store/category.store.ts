import { GenericState, ICategory } from 'src/app/shared/data-access/models';
import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { CategoryService } from 'src/app/modules/core/services';
import { switchMap, tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

type CategoryState = GenericState<ICategory[]>;

@Injectable()
export class CategoryStore extends ComponentStore<CategoryState> {
    readonly categories$ = this.select((state) => state.data);
    readonly isLoading$ = this.select((state) => state.status === 'loading');
    readonly error$ = this.select((state) => state.error);

    readonly loadCategories = this.effect(($) =>
        $.pipe(
            tap(() => this.patchState({ status: 'loading', data: undefined, error: undefined })),
            switchMap(() =>
                this.categoryService.getMany().pipe(
                    tapResponse(
                        (response) => {
                            this.patchState({ data: response, status: 'success' });
                        },
                        (error: HttpErrorResponse) => {
                            this.patchState({ error: error.message, status: 'error' });
                        }
                    )
                )
            )
        )
    );

    constructor(private categoryService: CategoryService) {
        super(<CategoryState>{});
    }
}
