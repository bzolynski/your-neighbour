import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvertisementCreationComponent, AdvertisementListComponent, AdvertisementRootComponent } from './pages';
import { AdvertisementRoutingModule } from './advertisement-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { CoreModule } from '../core/core.module';
import { ReactiveFormsModule } from '@angular/forms';
import {
    AdvertisementTopBarComponent,
    AdvertisementSidePanelComponent,
    AdvertisementFormComponent,
    AdvertisementFormItemComponent,
    AdvertisementFormItemImagesComponent,
    AdvertisementFormItemDetailsComponent,
    AdvertisementFormExistingLocationSelectComponent,
    AdvertisementFormItemSelectedImagesComponent,
    AdvertisementFormItemSelectComponent,
} from './components';
import { AdvertisementFormItemImagesImageComponent } from './components/atoms';

@NgModule({
    declarations: [
        AdvertisementRootComponent,
        AdvertisementCreationComponent,
        AdvertisementListComponent,
        AdvertisementTopBarComponent,
        AdvertisementSidePanelComponent,
        AdvertisementFormComponent,
        AdvertisementFormItemComponent,
        AdvertisementFormItemImagesComponent,
        AdvertisementFormItemDetailsComponent,
        AdvertisementFormExistingLocationSelectComponent,
        AdvertisementFormItemImagesImageComponent,
        AdvertisementFormItemSelectComponent,
        AdvertisementFormItemSelectedImagesComponent,
    ],
    imports: [CommonModule, AdvertisementRoutingModule, SharedModule, AngularMaterialModule, CoreModule, ReactiveFormsModule],
})
export class AdvertisementModule {}
