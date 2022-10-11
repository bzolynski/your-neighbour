import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdvertisementDetailsRoutingModule } from './advertisement-details-routing.module';
import { AdvertisementDetailsComponent } from './advertisement-details.component';
import { AdvertisementOverviewModule } from '../../ui/advertisement-overview/advertisement-overview.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
    AdvertisementDetailsEffects,
    advertisementDetailsReducer,
    ADVERTISEMENT_DETAILS_FEATURE_KEY,
} from '../../data-access/store/advertisement-details';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ButtonModule } from '@shared/ui/button/button.module';
@NgModule({
    imports: [
        CommonModule,
        AdvertisementDetailsRoutingModule,
        AdvertisementOverviewModule,
        ButtonModule,
        CardModule,
        AvatarModule,
        FlexLayoutModule,
        StoreModule.forFeature(ADVERTISEMENT_DETAILS_FEATURE_KEY, advertisementDetailsReducer),
        EffectsModule.forFeature([AdvertisementDetailsEffects]),
    ],
    declarations: [AdvertisementDetailsComponent],
})
export class AdvertisementDetailsModule {}
