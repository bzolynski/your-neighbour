import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvertisementShellRoutingModule } from './advertisement-shell-routing.module';
import { AdvertisementListModule } from '../advertisement-list/advertisement-list.module';
import { AdvertisementDetailsModule } from '../advertisement-details/advertisement-details.module';

@NgModule({
    imports: [CommonModule, AdvertisementShellRoutingModule, AdvertisementListModule, AdvertisementDetailsModule],
    declarations: [],
})
export class AdvertisementShellModule {}
