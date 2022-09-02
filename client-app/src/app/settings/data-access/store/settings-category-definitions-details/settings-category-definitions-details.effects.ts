import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { CategoryDefinitionsService } from '@services/.';
import {
    deleteDefinition,
    deleteDefinitionError,
    deleteDefinitionSuccess,
    loadDefinition,
    loadDefinitionError,
    loadDefinitionSuccess,
} from './settings-category-definitions-details.actions';
@Injectable()
export class SettingsCategoryDefinitionsDetailsEffects {
    constructor(private actions$: Actions, private categoryDefinitionService: CategoryDefinitionsService) {}

    loadDefinition$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadDefinition),
            switchMap(({ id }) =>
                this.categoryDefinitionService.getById(id).pipe(
                    map((definition) => loadDefinitionSuccess({ definition: definition })),
                    catchError((error: HttpErrorResponse) => of(loadDefinitionError({ error: error.error ?? error.message })))
                )
            )
        )
    );

    deleteDefinition$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteDefinition),
            switchMap(({ id }) =>
                this.categoryDefinitionService.delete(id).pipe(
                    map(() => deleteDefinitionSuccess({ id: id })),
                    catchError((error: HttpErrorResponse) => of(deleteDefinitionError({ error: error.error ?? error.message })))
                )
            )
        )
    );
}
