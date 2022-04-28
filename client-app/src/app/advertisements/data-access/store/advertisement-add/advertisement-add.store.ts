import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { GenericState, IItem, ILocalization } from 'src/app/shared/data-access/models';
import { Advertisement } from '../../models/advertisement.model';

interface AdvertisementAddState extends GenericState<Advertisement> {
    localizations: ILocalization[];
}

@Injectable()
export class AdvertisementAddStore extends ComponentStore<AdvertisementAddState> {
    readonly itemIdChanged = this.effect<IItem>(($) => $);
    readonly localizationChanged = this.effect<ILocalization>(($) => $);

    constructor() {
        super(<AdvertisementAddState>{});
    }
}
