import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdvertisementRoutingModule } from './advertisement-routing.module';
import { AdvertisementComponent } from './advertisement.component';
import { AdvertisementOverviewModule } from '../../ui/advertisement-overview/advertisement-overview.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';
@NgModule({
    imports: [CommonModule, AdvertisementRoutingModule, AdvertisementOverviewModule, SharedModule],
    declarations: [AdvertisementComponent],
})
export class AdvertisementModule {}
