import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvertisementRootComponent } from './pages';
import { AdvertisementRoutingModule } from './advertisement-routing.module';
import { AdvertisementTopBarComponent } from './components/shared/advertisement-top-bar/advertisement-top-bar.component';
import { AdvertisementSidePanelComponent } from './components/shared/advertisement-side-panel/advertisement-side-panel.component';
import { SharedModule } from '../shared/shared.module';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { AdvertisementCreationComponent } from './pages/advertisement-creation/advertisement-creation.component';
import { AdvertisementListComponent } from './pages/advertisement-list/advertisement-list.component';

@NgModule({
    declarations: [AdvertisementRootComponent, AdvertisementTopBarComponent, AdvertisementSidePanelComponent, AdvertisementCreationComponent, AdvertisementListComponent],
    imports: [CommonModule, AdvertisementRoutingModule, SharedModule, AngularMaterialModule],
})
export class AdvertisementModule {}
