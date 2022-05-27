import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { CategoryService } from 'src/app/modules/core/services';
import { loadCategory, loadCategoryError, loadCategorySuccess } from './settings-categories-details.actions';
@Injectable()
export class SettingsCategoriesDetailsEffects {
    constructor(private actions$: Actions, private categoryService: CategoryService) {}

    loadCategory$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadCategory),
            switchMap(({ id }) =>
                this.categoryService.get(id).pipe(
                    map((category) => loadCategorySuccess({ category: category })),
                    catchError((error: HttpErrorResponse) => of(loadCategoryError({ error: error.error ?? error.message })))
                )
            )
        )
    );
}
