import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsCategoriesFormRoutingModule } from './settings-categories-form-routing.module';
import { SettingsCategoriesFormComponent } from './settings-categories-form.component';
import { ElevatedSectionModule } from 'src/app/shared/directives/elevated-section/elevated-section.module';
import { TextInputModule } from 'src/app/shared/ui/text-input/text-input.module';
import { TextAreaInputModule } from 'src/app/shared/ui/text-area-input/text-area-input.module';
import { BackdropLoadingModule } from 'src/app/shared/ui/backdrop-loading/backdrop-loading.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { EffectsModule } from '@ngrx/effects';
import {
    SettingsCategoriesFormEffects,
    settingsCategoriesFormReducer,
    SETTINGS_CATEGORIES_FORM_STATE_FEATURE_KEY,
} from '../../data-access/store/settings-categories-form';
import { StoreModule } from '@ngrx/store';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { BouncyLoadingBackdropModule } from 'src/app/shared/ui/bouncy-loading-backdrop/bouncy-loading-backdrop.module';
@NgModule({
    imports: [
        CommonModule,
        SettingsCategoriesFormRoutingModule,
        ReactiveFormsModule,
        ElevatedSectionModule,
        TextInputModule,
        TextAreaInputModule,
        BackdropLoadingModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatSelectModule,
        MatOptionModule,
        MatButtonModule,
        BouncyLoadingBackdropModule,
        StoreModule.forFeature(SETTINGS_CATEGORIES_FORM_STATE_FEATURE_KEY, settingsCategoriesFormReducer),
        EffectsModule.forFeature([SettingsCategoriesFormEffects]),
    ],
    declarations: [SettingsCategoriesFormComponent],
})
export class SettingsCategoriesFormModule {}
