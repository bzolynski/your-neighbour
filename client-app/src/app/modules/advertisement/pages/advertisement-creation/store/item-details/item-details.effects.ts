import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { from, of, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ResponseStatus } from 'src/app/modules/core/models';
import { ItemService } from 'src/app/modules/core/services/item.service';
import { AdvertisementCreationState } from '../advertisement-creation.state';
import { loadItemDetails, loadItemDetailsError, loadItemDetailsSuccess } from './item-details.action';

@Injectable()
export class ItemDetailsEffects {
    constructor(private actions$: Actions, private itemService: ItemService, private store: Store<AdvertisementCreationState>) {}

    loadItemDetails$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadItemDetails),
            switchMap((params) =>
                from(
                    this.itemService.getDetails(params.id).pipe(
                        switchMap((resp) => {
                            if (resp.responseStatus === ResponseStatus.error) return throwError(resp);
                            return of(resp);
                        }),
                        map((resp) => resp.responseObject)
                    )
                ).pipe(
                    map((itemDetails) => loadItemDetailsSuccess({ itemDetails: itemDetails })),
                    catchError((error) => of(loadItemDetailsError({ error: error })))
                )
            )
        )
    );
}
