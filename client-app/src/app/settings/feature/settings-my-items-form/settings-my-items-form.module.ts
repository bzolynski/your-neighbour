import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsMyItemsFormRoutingModule } from './settings-my-items-form-routing.module';
import { SettingsMyItemsFormComponent } from './settings-my-items-form.component';
import { ItemFormModule } from 'src/app/shared/ui/item-form/item-form.module';
import {
    SettingsMyItemsFormEffects,
    settingsMyItemsFormReducer,
    SETTINGS_MY_ITEM_FORM_STATE_FEATURE_KEY,
} from '../../data-access/store/settings-my-items-form';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BackdropLoadingModule } from 'src/app/shared/ui/backdrop-loading/backdrop-loading.module';
import { ElevatedSectionModule } from 'src/app/shared/directives/elevated-section/elevated-section.module';
@NgModule({
    imports: [
        CommonModule,
        SettingsMyItemsFormRoutingModule,
        ItemFormModule,
        ElevatedSectionModule,
        BackdropLoadingModule,
        StoreModule.forFeature(SETTINGS_MY_ITEM_FORM_STATE_FEATURE_KEY, settingsMyItemsFormReducer),
        EffectsModule.forFeature([SettingsMyItemsFormEffects]),
    ],
    declarations: [SettingsMyItemsFormComponent],
})
export class SettingsMyItemsFormModule {}
