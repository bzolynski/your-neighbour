import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { CategoryDefinitionsService, CategoryService } from '@services/.';
import {
    createCategory,
    createCategoryError,
    createCategorySuccess,
    loadCategory,
    loadCategoryError,
    loadCategorySuccess,
    loadDefinitions,
    loadDefinitionsError,
    loadDefinitionsSuccess,
    updateCategory,
    updateCategoryError,
    updateCategorySuccess,
} from './settings-categories-form.actions';
@Injectable()
export class SettingsCategoriesFormEffects {
    constructor(
        private actions$: Actions,
        private categoryService: CategoryService,
        private definitionService: CategoryDefinitionsService
    ) {}

    loadCategory$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadCategory),
            switchMap(({ id }) =>
                this.categoryService.get(id, { includeDefinition: true }).pipe(
                    map((category) => loadCategorySuccess({ category: category })),
                    catchError((error: HttpErrorResponse) => of(loadCategoryError({ error: error.error ?? error.message })))
                )
            )
        )
    );

    loadDefinitions$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadDefinitions),
            switchMap(() =>
                this.definitionService.getAll().pipe(
                    map((definitions) => loadDefinitionsSuccess({ definitions: definitions })),
                    catchError((error: HttpErrorResponse) => of(loadDefinitionsError({ error: error.error ?? error.message })))
                )
            )
        )
    );

    createCategory$ = createEffect(() =>
        this.actions$.pipe(
            ofType(createCategory),
            switchMap(({ category }) =>
                this.categoryService.create(category).pipe(
                    map((id) => createCategorySuccess({ category: { ...category, id: id } })),
                    catchError((error: HttpErrorResponse) => of(createCategoryError({ error: error.error ?? error.message })))
                )
            )
        )
    );

    updateCategory$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateCategory),
            switchMap(({ id, category }) =>
                this.categoryService.update(id, category).pipe(
                    map(() => updateCategorySuccess({ category: { ...category, id: id } })),
                    catchError((error: HttpErrorResponse) => of(updateCategoryError({ error: error.error ?? error.message })))
                )
            )
        )
    );
}
