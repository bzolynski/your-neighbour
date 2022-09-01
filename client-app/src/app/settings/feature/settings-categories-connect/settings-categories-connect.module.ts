import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsCategoriesConnectRoutingModule } from './settings-categories-connect-routing.module';
import { SettingsCategoriesConnectComponent } from './settings-categories-connect.component';
import { TreeViewModule } from 'src/app/modules/tree-view/tree-view.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ElevatedSectionModule } from 'src/app/shared/directives/elevated-section/elevated-section.module';
import { MatButtonModule } from '@angular/material/button';
import { StoreModule } from '@ngrx/store';
import {
    SettingsCategoriesConnectEffects,
    settingsCategoriesConnectReducer,
    SETTINGS_CATEGORIES_CONNECT_STATE_FEATURE_KEY,
} from '../../data-access/store/settings-categories-connect';
import { EffectsModule } from '@ngrx/effects';
import { ConfirmationService } from 'primeng/api';
@NgModule({
    imports: [
        CommonModule,
        SettingsCategoriesConnectRoutingModule,
        TreeViewModule,
        FontAwesomeModule,
        MatButtonModule,
        ElevatedSectionModule,
        StoreModule.forFeature(SETTINGS_CATEGORIES_CONNECT_STATE_FEATURE_KEY, settingsCategoriesConnectReducer),
        EffectsModule.forFeature([SettingsCategoriesConnectEffects]),
    ],
    declarations: [SettingsCategoriesConnectComponent],
    providers: [ConfirmationService],
})
export class SettingsCategoriesConnectModule {}
