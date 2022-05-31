import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsCategoryDefinitionsDetailsRoutingModule } from './settings-category-definitions-details-routing.module';
import { SettingsCategoryDefinitionsDetailsComponent } from './settings-category-definitions-details.component';
import { StoreModule } from '@ngrx/store';
import {
    SettingsCategoryDefinitionsDetailsEffects,
    settingsCategoryDefinitionsDetailsReducer,
    SETTINGS_CATEGORY_DEFINITIONS_DETAILS_STATE_FEATURE_KEY,
} from '../../data-access/store/settings-category-definitions-details';
import { EffectsModule } from '@ngrx/effects';
import { BouncyLoadingBackdropModule } from 'src/app/shared/ui/bouncy-loading-backdrop/bouncy-loading-backdrop.module';
import { ElevatedSectionModule } from 'src/app/shared/directives/elevated-section/elevated-section.module';
import { MatButtonModule } from '@angular/material/button';
@NgModule({
    imports: [
        CommonModule,
        SettingsCategoryDefinitionsDetailsRoutingModule,
        MatButtonModule,
        ElevatedSectionModule,
        BouncyLoadingBackdropModule,
        StoreModule.forFeature(
            SETTINGS_CATEGORY_DEFINITIONS_DETAILS_STATE_FEATURE_KEY,
            settingsCategoryDefinitionsDetailsReducer
        ),
        EffectsModule.forFeature([SettingsCategoryDefinitionsDetailsEffects]),
    ],
    declarations: [SettingsCategoryDefinitionsDetailsComponent],
})
export class SettingsCategoryDefinitionsDetailsModule {}
