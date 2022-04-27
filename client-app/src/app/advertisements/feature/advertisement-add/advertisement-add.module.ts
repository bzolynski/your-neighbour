import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvertisementAddRoutingModule } from './advertisement-add-routing.module';
import { AdvertisementAddComponent } from './advertisement-add.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { AngularMaterialModule } from 'src/app/modules/angular-material/angular-material.module';
import { ItemFormModule } from 'src/app/shared/item-form/feature/item-form.module';
import { ItemSelectModule } from 'src/app/shared/ui/item-select/item-select.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LocalizationSelectModule } from 'src/app/shared/ui/localization-select/localization-select.module';
import { MapModule } from 'src/app/shared/ui/map/map.module';

// ng g m advertisements/feature/advertisement-add --route add --module advertisements/feature/advertisement-shell

@NgModule({
    imports: [
        CommonModule,
        AdvertisementAddRoutingModule,
        RouterModule,
        SharedModule,
        AngularMaterialModule,
        ItemFormModule,
        ItemSelectModule,
        ReactiveFormsModule,
        LocalizationSelectModule,
        MapModule,
    ],
    declarations: [AdvertisementAddComponent],
})
export class AdvertisementAddModule {}
