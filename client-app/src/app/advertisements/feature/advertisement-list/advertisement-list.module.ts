import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvertisementListRoutingModule } from './advertisement-list-routing.module';
import { AdvertisementListComponent } from './advertisement-list.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { MenuModule } from 'primeng/menu';
import { DataViewModule } from 'primeng/dataview';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RatingModule } from 'primeng/rating';
import { FlexLayoutModule, FlexModule } from '@angular/flex-layout';
import { RippleModule } from 'primeng/ripple';
@NgModule({
    imports: [
        CommonModule,
        AdvertisementListRoutingModule,
        SharedModule,
        MenuModule,
        DataViewModule,
        DropdownModule,
        ButtonModule,
        InputTextModule,
        FlexLayoutModule,
        FlexModule,
        RatingModule,
        RippleModule,
    ],
    declarations: [AdvertisementListComponent],
})
export class AdvertisementListModule {}
