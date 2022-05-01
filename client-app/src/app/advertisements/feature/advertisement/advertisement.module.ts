import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdvertisementRoutingModule } from './advertisement-routing.module';
import { AdvertisementComponent } from './advertisement.component';
import { AdvertisementOverviewModule } from '../../ui/advertisement-overview/advertisement-overview.module';
@NgModule({
    imports: [CommonModule, AdvertisementRoutingModule, AdvertisementOverviewModule],
    declarations: [AdvertisementComponent],
})
export class AdvertisementModule {}
