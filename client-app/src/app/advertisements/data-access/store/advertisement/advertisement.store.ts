import { GenericState } from 'src/app/shared/data-access/models';
import { Advertisement } from '../../models/advertisement.model';
import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { switchMap, tap } from 'rxjs/operators';
import { AdvertisementService } from '../';
import { HttpErrorResponse } from '@angular/common/http';

type AdvertisementState = GenericState<Advertisement>;

@Injectable()
export class AdvertisementStore extends ComponentStore<AdvertisementState> {
    readonly advertisement$ = this.select((state) => state.data);
    readonly isLoading$ = this.select((state) => state.status === 'loading');
    readonly error$ = this.select((state) => state.error);

    readonly loadAdvertisement = this.effect<number>((params$) =>
        params$.pipe(
            tap(() => this.patchState({ status: 'loading', error: undefined, data: undefined })),
            switchMap((id) =>
                this.advertisementService
                    .get(id, {
                        includeCategory: true,
                        includeImages: true,
                        maxImages: 1,
                        includeDefinition: true,
                        includeLocalization: true,
                        includeUser: true,
                    })
                    .pipe(
                        tapResponse(
                            (response) => {
                                this.patchState({ status: 'success', data: response });
                            },
                            (error: HttpErrorResponse) => {
                                this.patchState({ status: 'error', error: error.message });
                            }
                        )
                    )
            )
        )
    );

    constructor(private advertisementService: AdvertisementService) {
        super(<AdvertisementState>{});
    }
}
