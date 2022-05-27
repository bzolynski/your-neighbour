import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { CategoryService } from 'src/app/modules/core/services';
import { loadCategories, loadCategoriesError, loadCategoriesSuccess } from './settings-categories.actions';
@Injectable()
export class SettingsCategoriesEffects {
    constructor(private actions$: Actions, private categoryService: CategoryService) {}

    loadCategories$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadCategories),
            switchMap(() =>
                this.categoryService.getMany().pipe(
                    map((categories) => loadCategoriesSuccess({ categories: categories })),
                    catchError((error: HttpErrorResponse) => of(loadCategoriesError({ error: error.error ?? error.message })))
                )
            )
        )
    );
}
