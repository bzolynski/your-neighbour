import { GenericState, IImage } from 'src/app/shared/data-access/models';
import { Advertisement } from '../../models/advertisement.model';
import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { switchMap, tap } from 'rxjs/operators';
import { AdvertisementService } from '../';
import { HttpErrorResponse } from '@angular/common/http';
import { ItemService } from 'src/app/modules/core/services/item.service';

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
                        // includeImages: true,
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
                        ),
                        switchMap((response) =>
                            this.itemService.getImagesByItem(response.item.id).pipe(tap((images) => this.updateImages(images)))
                        )
                    )
            )
        )
    );

    private readonly updateImages = this.updater((state, images: IImage[]) => {
        const advertisement = { ...state.data, item: { ...state.data?.item, images: images } } as Advertisement;
        return { ...state, data: advertisement };
    });

    constructor(private advertisementService: AdvertisementService, private itemService: ItemService) {
        super(<AdvertisementState>{});
    }
}
