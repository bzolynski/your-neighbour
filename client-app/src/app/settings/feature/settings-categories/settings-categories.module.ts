import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsCategoriesRoutingModule } from './settings-categories-routing.module';
import { SettingsCategoriesComponent } from './settings-categories.component';
import { SettingsLayoutRouterModule } from '../../ui/settings-layout-router/settings-layout-router.module';
import { BackdropLoadingModule } from 'src/app/shared/ui/backdrop-loading/backdrop-loading.module';
import { StoreModule } from '@ngrx/store';
import {
    SettingsCategoriesEffects,
    settingsCategoriesReducer,
    SETTINGS_CATEGORIES_STATE_FEATURE_KEY,
} from '../../data-access/store/settings-categories';
import { EffectsModule } from '@ngrx/effects';
import { CardModule } from 'src/app/shared/ui/card/card.module';
import { CardContentModule } from 'src/app/shared/ui/card-content/card-content.module';
import { MatListModule } from '@angular/material/list';
import { ElevatedSectionModule } from 'src/app/shared/directives/elevated-section/elevated-section.module';
import { MatButtonModule } from '@angular/material/button';
@NgModule({
    imports: [
        CommonModule,
        CardModule,
        CardContentModule,
        SettingsCategoriesRoutingModule,
        SettingsLayoutRouterModule,
        BackdropLoadingModule,
        MatListModule,
        ElevatedSectionModule,
        MatButtonModule,
        StoreModule.forFeature(SETTINGS_CATEGORIES_STATE_FEATURE_KEY, settingsCategoriesReducer),
        EffectsModule.forFeature([SettingsCategoriesEffects]),
    ],
    declarations: [SettingsCategoriesComponent],
})
export class SettingsCategoriesModule {}
