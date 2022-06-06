import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvertisementShellRoutingModule } from './advertisement-shell-routing.module';
import { AdvertisementListModule } from '../advertisement-list/advertisement-list.module';
import { AdvertisementModule } from '../advertisement/advertisement.module';

@NgModule({
    imports: [CommonModule, AdvertisementShellRoutingModule, AdvertisementListModule, AdvertisementModule],
    declarations: [],
})
export class AdvertisementShellModule {}
