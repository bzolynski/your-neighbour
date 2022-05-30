import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { CategoryDefinitionsService } from 'src/app/modules/core/services';
import { loadDefinitions, loadDefinitionsError, loadDefinitionsSuccess } from './settings-category-definitions.actions';
@Injectable()
export class SettingsCategoryDefinitionsEffects {
    constructor(private actions$: Actions, private categoryDefinitionService: CategoryDefinitionsService) {}

    loadloadDefinitions$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadDefinitions),
            switchMap(() =>
                this.categoryDefinitionService.getAll().pipe(
                    map((definitions) => loadDefinitionsSuccess({ definitions: definitions })),
                    catchError((error: HttpErrorResponse) => of(loadDefinitionsError({ error: error.error ?? error.message })))
                )
            )
        )
    );
}
