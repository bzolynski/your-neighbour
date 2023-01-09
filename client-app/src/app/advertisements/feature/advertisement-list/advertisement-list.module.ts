import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvertisementListRoutingModule } from './advertisement-list-routing.module';
import { AdvertisementListComponent } from './advertisement-list.component';
import { MenuModule } from 'primeng/menu';
import { DataViewModule } from 'primeng/dataview';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { RatingModule } from 'primeng/rating';
import { FlexLayoutModule, FlexModule } from '@angular/flex-layout';
import { RippleModule } from 'primeng/ripple';
import { SharedModule } from '@shared/shared.module';
import { StopPropagationModule } from '@shared/directives/stop-propagation/stop-propagation.module';
@NgModule({
    imports: [
        CommonModule,
        AdvertisementListRoutingModule,
        MenuModule,
        DataViewModule,
        DropdownModule,
        InputTextModule,
        FlexLayoutModule,
        FlexModule,
        RatingModule,
        RippleModule,
        SharedModule,
        StopPropagationModule,
    ],
    declarations: [AdvertisementListComponent],
})
export class AdvertisementListModule {}
