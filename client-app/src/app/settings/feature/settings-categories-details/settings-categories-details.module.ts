import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsCategoriesDetailsRoutingModule } from './settings-categories-details-routing.module';
import { SettingsCategoriesDetailsComponent } from './settings-categories-details.component';
import { StoreModule } from '@ngrx/store';
import {
    SettingsCategoriesDetailsEffects,
    settingsCategoriesDetailsReducer,
    SETTINGS_CATEGORIES_DETAILS_STATE_FEATURE_KEY,
} from '../../data-access/store/settings-categories-details';
import { EffectsModule } from '@ngrx/effects';
import { ElevatedSectionModule } from 'src/app/shared/directives/elevated-section/elevated-section.module';
import { MatButtonModule } from '@angular/material/button';
@NgModule({
    imports: [
        CommonModule,
        SettingsCategoriesDetailsRoutingModule,
        MatButtonModule,
        ElevatedSectionModule,
        StoreModule.forFeature(SETTINGS_CATEGORIES_DETAILS_STATE_FEATURE_KEY, settingsCategoriesDetailsReducer),
        EffectsModule.forFeature([SettingsCategoriesDetailsEffects]),
    ],
    declarations: [SettingsCategoriesDetailsComponent],
})
export class SettingsCategoriesDetailsModule {}
