import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { CategoryDefinitionsService, CategoryService } from 'src/app/modules/core/services';
import { ROOT_CATEGORY_GUID } from 'src/app/shared/data-access/models';
import {
    loadTree,
    loadTreeError,
    loadTreeSuccess,
    loadUnasignedCategories,
    loadUnasignedCategoriesError,
    loadUnasignedCategoriesSuccess,
} from './settings-categories-connect.actions';
@Injectable()
export class SettingsCategoriesConnectEffects {
    constructor(
        private actions$: Actions,
        private categoryService: CategoryService,
        private definitionService: CategoryDefinitionsService
    ) {}

    loadTree$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadTree),
            switchMap(() =>
                this.categoryService.getMany().pipe(
                    map((categories) =>
                        categories
                            .toLookup(
                                (x) => x,
                                (x) => x,
                                (p, c) => p.id == c.parentId
                            )
                            .toTree((lookup) => [...lookup].filter((val) => val[0].guid == ROOT_CATEGORY_GUID)[0])
                    ),
                    map((tree) => loadTreeSuccess({ tree: tree })),
                    catchError((error: HttpErrorResponse) => of(loadTreeError({ error: error.error ?? error.message })))
                )
            )
        )
    );

    loadUnasignedCategories$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadUnasignedCategories),
            switchMap(() =>
                this.categoryService.getUnassigned().pipe(
                    map((categories) => loadUnasignedCategoriesSuccess({ categories: categories })),
                    catchError((error: HttpErrorResponse) =>
                        of(loadUnasignedCategoriesError({ error: error.error ?? error.message }))
                    )
                )
            )
        )
    );
}
