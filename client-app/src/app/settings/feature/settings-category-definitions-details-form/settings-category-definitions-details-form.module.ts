import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsCategoryDefinitionsDetailsFormRoutingModule } from './settings-category-definitions-details-form-routing.module';
import { SettingsCategoryDefinitionsDetailsFormComponent } from './settings-category-definitions-details-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ElevatedSectionModule } from 'src/app/shared/directives/elevated-section/elevated-section.module';
import { TextAreaInputModule } from 'src/app/shared/ui/text-area-input/text-area-input.module';
import { TextInputModule } from 'src/app/shared/ui/text-input/text-input.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
    SettingsCategoryDefinitionsFormEffects,
    settingsCategoryDefinitionsFormReducer,
    SETTINGS_CATEGORY_DEFINITIONS_FORM_STATE_FEATURE_KEY,
} from '../../data-access/store/settings-category-definitions-form';
import { BouncyLoadingBackdropModule } from 'src/app/shared/ui/bouncy-loading-backdrop/bouncy-loading-backdrop.module';
@NgModule({
    imports: [
        CommonModule,
        SettingsCategoryDefinitionsDetailsFormRoutingModule,
        ReactiveFormsModule,
        ElevatedSectionModule,
        TextInputModule,
        TextAreaInputModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatSelectModule,
        MatOptionModule,
        MatButtonModule,
        BouncyLoadingBackdropModule,
        StoreModule.forFeature(SETTINGS_CATEGORY_DEFINITIONS_FORM_STATE_FEATURE_KEY, settingsCategoryDefinitionsFormReducer),
        EffectsModule.forFeature([SettingsCategoryDefinitionsFormEffects]),
    ],
    declarations: [SettingsCategoryDefinitionsDetailsFormComponent],
})
export class SettingsCategoryDefinitionsDetailsFormModule {}
