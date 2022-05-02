import { GenericState } from 'src/app/shared/data-access/models';
import { Advertisement } from '../../models/advertisement.model';
import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { switchMap, tap } from 'rxjs/operators';
import { HttpError, Response } from 'src/app/modules/core/models';
import { AdvertisementService } from '..';

type AdvertisementListState = GenericState<Advertisement[]>;

@Injectable()
export class AdvertisementListStore extends ComponentStore<AdvertisementListState> {
    readonly advertisements$ = this.select((state) => state.data);
    readonly isLoading$ = this.select((state) => state.status === 'loading');
    readonly error$ = this.select((state) => state.error);

    readonly loadAdvertisements = this.effect(($) =>
        $.pipe(
            tap(() => this.patchState({ status: 'loading', error: undefined, data: undefined })),
            switchMap(() =>
                this.advertisementService
                    .getMany({
                        includeCategory: true,
                        // TODO: turn images on
                        includeImages: false,
                        maxImages: 1,
                        includeDefinition: true,
                        includeLocalization: true,
                        includeUser: true,
                    })
                    .pipe(
                        tapResponse(
                            (response) => {
                                this.patchState({ status: 'success', data: response.responseObject });
                            },
                            (error: HttpError<Response>) => {
                                this.patchState({ status: 'error', error: error.error?.errorMessages[0] ?? '' });
                            }
                        )
                    )
            )
        )
    );

    constructor(private advertisementService: AdvertisementService) {
        super(<AdvertisementListState>{});
    }
}
