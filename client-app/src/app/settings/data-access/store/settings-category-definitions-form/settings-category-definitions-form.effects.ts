import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { CategoryDefinitionsService } from 'src/app/modules/core/services';
import {
    createDefinition,
    createDefinitionError,
    createDefinitionSuccess,
    loadDefinition,
    loadDefinitionError,
    loadDefinitionSuccess,
    updateDefinition,
    updateDefinitionError,
    updateDefinitionSuccess,
} from './settings-category-definitions-form.actions';
@Injectable()
export class SettingsCategoryDefinitionsFormEffects {
    constructor(private actions$: Actions, private categoryDefinitionService: CategoryDefinitionsService) {}
    loadDefinition$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadDefinition),
            switchMap(({ id }) =>
                this.categoryDefinitionService.getById(id).pipe(
                    map((definition) => loadDefinitionSuccess({ definiton: definition })),
                    catchError((error: HttpErrorResponse) => of(loadDefinitionError({ error: error.error ?? error.message })))
                )
            )
        )
    );
    createDefinition$ = createEffect(() =>
        this.actions$.pipe(
            ofType(createDefinition),
            switchMap(({ definiton }) =>
                this.categoryDefinitionService.create(definiton).pipe(
                    map((id) => createDefinitionSuccess({ definiton: { ...definiton, id: id } })),
                    catchError((error: HttpErrorResponse) => of(createDefinitionError({ error: error.error ?? error.message })))
                )
            )
        )
    );

    updateDefinition$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateDefinition),
            switchMap(({ id, definiton }) =>
                this.categoryDefinitionService.update(id, definiton).pipe(
                    map(() => updateDefinitionSuccess({ definiton: { ...definiton, id: id } })),
                    catchError((error: HttpErrorResponse) => of(updateDefinitionError({ error: error.error ?? error.message })))
                )
            )
        )
    );
}
