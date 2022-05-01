import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvertisementShellRoutingModule } from './advertisement-shell-routing.module';
import { AdvertisementListModule } from '../advertisement-list/advertisement-list.module';
import { AdvertisementAddModule } from '../advertisement-add/advertisement-add.module';
import { AdvertisementModule } from '../advertisement/advertisement.module';

@NgModule({
    imports: [
        CommonModule,
        AdvertisementShellRoutingModule,
        AdvertisementListModule,
        AdvertisementAddModule,
        AdvertisementModule,
    ],
    declarations: [],
})
export class AdvertisementShellModule {}
