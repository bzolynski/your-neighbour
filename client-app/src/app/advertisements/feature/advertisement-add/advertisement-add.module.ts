import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvertisementAddRoutingModule } from './advertisement-add-routing.module';
import { AdvertisementAddComponent } from './advertisement-add.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { AngularMaterialModule } from 'src/app/modules/angular-material/angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LocalizationFormModule } from 'src/app/shared/ui/localization-form/localization-form.module';
import { ParentWidthModule } from 'src/app/shared/directives/parent-width/parent-width.module';
import { AdvertisementOverviewModule } from '../../ui/advertisement-overview/advertisement-overview.module';
import { AccordionSelectModule } from 'src/app/shared/ui/accordion-select/accordion-select.module';
import { AccordionSelectItemModule } from 'src/app/shared/ui/accordion-select-item/accordion-select-item.module';
import { MatDialogModule } from '@angular/material/dialog';
import { ItemFormModule } from 'src/app/shared/ui/item-form/item-form.module';
import { TextAreaInputModule } from 'src/app/shared/ui/text-area-input/text-area-input.module';

// ng g m advertisements/feature/advertisement-add --route add --module advertisements/feature/advertisement-shell

@NgModule({
    imports: [
        CommonModule,
        AdvertisementAddRoutingModule,
        RouterModule,
        SharedModule,
        AngularMaterialModule,
        ItemFormModule,
        ReactiveFormsModule,
        LocalizationFormModule,
        ParentWidthModule,
        AdvertisementOverviewModule,
        AccordionSelectModule,
        AccordionSelectItemModule,
        MatDialogModule,
        TextAreaInputModule,
    ],
    declarations: [AdvertisementAddComponent],
})
export class AdvertisementAddModule {}
