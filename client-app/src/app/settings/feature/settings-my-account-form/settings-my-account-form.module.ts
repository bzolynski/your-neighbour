import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsMyAccountFormRoutingModule } from './settings-my-account-form-routing.module';
import { SettingsMyAccountFormComponent } from './settings-my-account-form.component';
import { ElevatedSectionModule } from 'src/app/shared/directives/elevated-section/elevated-section.module';
import { TextInputModule } from 'src/app/shared/ui/text-input/text-input.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
    SettingsMyAccountFormEffects,
    settingsMyAccountFormReducer,
    SETTINGS_MY_ACCOUNT_FORM_STATE_FEATURE_KEY,
} from '../../data-access/store/settings-my-account-form';
import { BouncyLoadingBackdropModule } from 'src/app/shared/ui/bouncy-loading-backdrop/bouncy-loading-backdrop.module';
@NgModule({
    imports: [
        CommonModule,
        SettingsMyAccountFormRoutingModule,
        ElevatedSectionModule,
        TextInputModule,
        ReactiveFormsModule,
        MatButtonModule,
        BouncyLoadingBackdropModule,
        StoreModule.forFeature(SETTINGS_MY_ACCOUNT_FORM_STATE_FEATURE_KEY, settingsMyAccountFormReducer),
        EffectsModule.forFeature([SettingsMyAccountFormEffects]),
    ],
    declarations: [SettingsMyAccountFormComponent],
})
export class SettingsMyAccountFormModule {}
