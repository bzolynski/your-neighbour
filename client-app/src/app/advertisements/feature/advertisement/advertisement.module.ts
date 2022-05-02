import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdvertisementRoutingModule } from './advertisement-routing.module';
import { AdvertisementComponent } from './advertisement.component';
import { AdvertisementOverviewModule } from '../../ui/advertisement-overview/advertisement-overview.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { ElevatedSectionModule } from 'src/app/shared/directives/elevated-section/elevated-section.module';
@NgModule({
    imports: [CommonModule, AdvertisementRoutingModule, AdvertisementOverviewModule, SharedModule, ElevatedSectionModule],
    declarations: [AdvertisementComponent],
})
export class AdvertisementModule {}
