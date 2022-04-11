import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { from, of, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ResponseStatus } from 'src/app/modules/core/models';
import { ItemService } from 'src/app/modules/core/services/item.service';
import { AdvertisementCreationState } from '../advertisement-creation.state';
import { loadItemImages, loadItemImagesError, loadItemImagesSuccess } from './item-images.action';

@Injectable()
export class ItemImagesEffects {
    constructor(private actions$: Actions, private itemService: ItemService, private store: Store<AdvertisementCreationState>) {}

    loadItemImages$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadItemImages),
            switchMap((params) =>
                from(
                    this.itemService.getImagesByItem(params.id).pipe(
                        switchMap((resp) => {
                            if (resp.responseStatus === ResponseStatus.error) return throwError(resp);
                            return of(resp);
                        }),
                        map((resp) => resp.responseObject)
                    )
                ).pipe(
                    map((images) => loadItemImagesSuccess({ images: images })),
                    catchError((error) => of(loadItemImagesError({ error: error })))
                )
            )
        )
    );
}
