import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvertisementComponent } from './pages';
import { RouterModule } from '@angular/router';
import { AdvertisementRoutingModule } from './advertisement-routing.module';

@NgModule({
    declarations: [AdvertisementComponent],
    imports: [CommonModule, RouterModule, AdvertisementRoutingModule],
})
export class AdvertisementModule {}
