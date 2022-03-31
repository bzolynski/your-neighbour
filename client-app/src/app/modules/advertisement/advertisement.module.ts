import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvertisementComponent } from './pages';
import { AdvertisementRoutingModule } from './advertisement-routing.module';
import { AdvertisementTopBarComponent } from './components/shared/advertisement-top-bar/advertisement-top-bar.component';
import { AdvertisementSidePanelComponent } from './components/shared/advertisement-side-panel/advertisement-side-panel.component';
import { SharedModule } from '../shared/shared.module';
import { AngularMaterialModule } from '../angular-material/angular-material.module';

@NgModule({
    declarations: [AdvertisementComponent, AdvertisementTopBarComponent, AdvertisementSidePanelComponent],
    imports: [CommonModule, AdvertisementRoutingModule, SharedModule, AngularMaterialModule],
})
export class AdvertisementModule {}
