import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AdvertisementService } from '@services/.';
import { loadAdvertisements, loadAdvertisementsError, loadAdvertisementsSuccess } from './home.actions';

@Injectable()
export class HomeEffects {
    constructor(private actions$: Actions, private advertisementService: AdvertisementService) {}
    loadAdvertisements$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadAdvertisements),
            switchMap(({ quantity }) =>
                this.advertisementService.getMany({
                    includeCategory: true,
                    includeDefinition: true,
                    includeLocalization: true,
                    includeUser: true,
                    includeItem: true,
                    take: quantity,
                })
            ),
            map((advertisements) => loadAdvertisementsSuccess({ advertisements: advertisements })),
            catchError((error: HttpErrorResponse) => of(loadAdvertisementsError({ error: error.error ?? error.message })))
        )
    );

    // loadImages$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(loadAdvertisementsSuccess),
    //         mergeMap(({ advertisements }) => from(advertisements.map((value) => value.item.id))),
    //         mergeMap((id) =>
    //             this.itemService.getImagesByItem(id, { maxImages: 1 }).pipe(
    //                 map((images) => loadImagesSuccess({ itemId: id, images: images })),
    //                 catchError((error: HttpErrorResponse) => of(loadImagesError({ error: error.error ?? error.message })))
    //             )
    //         )
    //     )
    // );
}
