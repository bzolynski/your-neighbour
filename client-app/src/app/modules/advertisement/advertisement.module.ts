import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvertisementRootComponent } from './pages';
import { AdvertisementRoutingModule } from './advertisement-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { AdvertisementCreationComponent } from './pages/advertisement-creation/advertisement-creation.component';
import { AdvertisementListComponent } from './pages/advertisement-list/advertisement-list.component';
import { CoreModule } from '../core/core.module';
import { AdvertisementFormComponent } from './components/advertisement-form/advertisement-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AdvertisementSidePanelComponent, AdvertisementTopBarComponent } from './components';
import { AdvertisementFormItemComponent } from './components/advertisement-form-item/advertisement-form-item.component';
import { AdvertisementFormItemPhotosComponent } from './components/advertisement-form-item-photos/advertisement-form-item-photos.component';
import { AdvertisementFormItemDetailsComponent } from './components/advertisement-form-item-details/advertisement-form-item-details.component';
import { AdvertisementFormExistingLocationSelectComponent } from './components/advertisement-form-existing-location-select/advertisement-form-existing-location-select.component';

@NgModule({
    declarations: [
        AdvertisementRootComponent,
        AdvertisementTopBarComponent,
        AdvertisementSidePanelComponent,
        AdvertisementCreationComponent,
        AdvertisementListComponent,
        AdvertisementFormComponent,
        AdvertisementFormItemComponent,
        AdvertisementFormItemPhotosComponent,
        AdvertisementFormItemDetailsComponent,
        AdvertisementFormExistingLocationSelectComponent,
    ],
    imports: [CommonModule, AdvertisementRoutingModule, SharedModule, AngularMaterialModule, CoreModule, ReactiveFormsModule],
})
export class AdvertisementModule {}
