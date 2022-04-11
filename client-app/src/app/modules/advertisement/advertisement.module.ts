import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvertisementListComponent, AdvertisementRootComponent } from './pages';
import { AdvertisementRoutingModule } from './advertisement-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AdvertisementTopBarComponent, AdvertisementSidePanelComponent } from './components';
import { AdvertisementCreationModule } from './pages/advertisement-creation/advertisement-creation.module';

@NgModule({
    declarations: [
        AdvertisementRootComponent,
        AdvertisementListComponent,
        AdvertisementTopBarComponent,
        AdvertisementSidePanelComponent,
    ],
    imports: [
        AdvertisementRoutingModule,
        CommonModule,
        SharedModule,
        AngularMaterialModule,
        ReactiveFormsModule,
        AdvertisementCreationModule,
    ],
})
export class AdvertisementModule {}
