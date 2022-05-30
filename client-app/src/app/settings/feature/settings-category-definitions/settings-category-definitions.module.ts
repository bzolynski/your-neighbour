import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsCategoryDefinitionsRoutingModule } from './settings-category-definitions-routing.module';
import { SettingsCategoryDefinitionsComponent } from './settings-category-definitions.component';
import { StoreModule } from '@ngrx/store';
import {
    SettingsCategoryDefinitionsEffects,
    settingsCategoryDefinitionsReducer,
    SETTINGS_CATEGORY_DEFINITIONS_STATE_FEATURE_KEY,
} from '../../data-access/store/settings-category-definitions';
import { EffectsModule } from '@ngrx/effects';
import { SettingsLayoutRouterModule } from '../../ui/settings-layout-router/settings-layout-router.module';
import { BackdropLoadingModule } from 'src/app/shared/ui/backdrop-loading/backdrop-loading.module';
import { MatButtonModule } from '@angular/material/button';
import { ElevatedSectionModule } from 'src/app/shared/directives/elevated-section/elevated-section.module';
import { MatListModule } from '@angular/material/list';
@NgModule({
    imports: [
        CommonModule,
        SettingsCategoryDefinitionsRoutingModule,
        SettingsLayoutRouterModule,
        BackdropLoadingModule,
        MatButtonModule,
        MatListModule,
        ElevatedSectionModule,
        StoreModule.forFeature(SETTINGS_CATEGORY_DEFINITIONS_STATE_FEATURE_KEY, settingsCategoryDefinitionsReducer),
        EffectsModule.forFeature([SettingsCategoryDefinitionsEffects]),
    ],
    declarations: [SettingsCategoryDefinitionsComponent],
})
export class SettingsCategoryDefinitionsModule {}
