import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsMyAdvertisementsFormRoutingModule } from './settings-my-advertisements-form-routing.module';
import { SettingsMyAdvertisementsFormComponent } from './settings-my-advertisements-form.component';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TextInputModule } from 'src/app/shared/ui/text-input/text-input.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { AdvertisementOverviewModule } from 'src/app/advertisements/ui/advertisement-overview/advertisement-overview.module';
import { ElevatedSectionModule } from 'src/app/shared/directives/elevated-section/elevated-section.module';
import { ParentWidthModule } from 'src/app/shared/directives/parent-width/parent-width.module';
import { AccordionSelectItemModule } from 'src/app/shared/ui/accordion-select-item/accordion-select-item.module';
import { AccordionSelectModule } from 'src/app/shared/ui/accordion-select/accordion-select.module';
import { ItemFormModule } from 'src/app/shared/ui/item-form/item-form.module';
import { LocalizationFormModule } from 'src/app/shared/ui/localization-form/localization-form.module';
import { TextAreaInputModule } from 'src/app/shared/ui/text-area-input/text-area-input.module';
import {
    SettingsMyAdvertisementsFormEffects,
    settingsMyAdvertisementsFormReducer,
    SETTINGS_MY_ADVERTISEMENTS_FORM_STATE_FEATURE_KEY,
} from '../../data-access/store/settings-my-advertisements-form';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { BackdropLoadingModule } from 'src/app/shared/ui/backdrop-loading/backdrop-loading.module';
@NgModule({
    imports: [
        CommonModule,
        SettingsMyAdvertisementsFormRoutingModule,
        RouterModule,
        ItemFormModule,
        ReactiveFormsModule,
        LocalizationFormModule,
        ParentWidthModule,
        AdvertisementOverviewModule,
        AccordionSelectModule,
        AccordionSelectItemModule,
        MatDialogModule,
        TextAreaInputModule,
        TextInputModule,
        ElevatedSectionModule,
        MatSelectModule,
        MatFormFieldModule,
        MatOptionModule,
        MatButtonModule,
        BackdropLoadingModule,
        StoreModule.forFeature(SETTINGS_MY_ADVERTISEMENTS_FORM_STATE_FEATURE_KEY, settingsMyAdvertisementsFormReducer),
        EffectsModule.forFeature([SettingsMyAdvertisementsFormEffects]),
    ],
    declarations: [SettingsMyAdvertisementsFormComponent],
    exports: [SettingsMyAdvertisementsFormComponent],
})
export class SettingsMyAdvertisementsFormModule {}
