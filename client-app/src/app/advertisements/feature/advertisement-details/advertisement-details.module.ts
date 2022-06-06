import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdvertisementDetailsRoutingModule } from './advertisement-details-routing.module';
import { AdvertisementDetailsComponent } from './advertisement-details.component';
import { AdvertisementOverviewModule } from '../../ui/advertisement-overview/advertisement-overview.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { ElevatedSectionModule } from 'src/app/shared/directives/elevated-section/elevated-section.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
    AdvertisementDetailsEffects,
    advertisementDetailsReducer,
    ADVERTISEMENT_DETAILS_FEATURE_KEY,
} from '../../data-access/store/advertisement-details';
@NgModule({
    imports: [
        CommonModule,
        AdvertisementDetailsRoutingModule,
        AdvertisementOverviewModule,
        SharedModule,
        ElevatedSectionModule,
        StoreModule.forFeature(ADVERTISEMENT_DETAILS_FEATURE_KEY, advertisementDetailsReducer),
        EffectsModule.forFeature([AdvertisementDetailsEffects]),
    ],
    declarations: [AdvertisementDetailsComponent],
})
export class AdvertisementDetailsModule {}
