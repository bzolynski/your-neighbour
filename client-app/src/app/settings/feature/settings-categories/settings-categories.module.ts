import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsCategoriesRoutingModule } from './settings-categories-routing.module';
import { SettingsCategoriesComponent } from './settings-categories.component';
import { StoreModule } from '@ngrx/store';
import {
    SettingsCategoriesEffects,
    settingsCategoriesReducer,
    SETTINGS_CATEGORIES_STATE_FEATURE_KEY,
} from '../../data-access/store/settings-categories';
import { EffectsModule } from '@ngrx/effects';
import { TreeModule } from 'primeng/tree';
import { SharedModule } from '@shared/shared.module';
import { PanelModule } from 'primeng/panel';
import { DialogModule } from 'primeng/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { DividerModule } from 'primeng/divider';
import { CheckboxModule } from 'primeng/checkbox';
import { BackdropLoadingModule } from '@shared/ui/backdrop-loading/backdrop-loading.module';
@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SettingsCategoriesRoutingModule,
        BackdropLoadingModule,
        StoreModule.forFeature(SETTINGS_CATEGORIES_STATE_FEATURE_KEY, settingsCategoriesReducer),
        EffectsModule.forFeature([SettingsCategoriesEffects]),
        TreeModule,
        SharedModule,
        PanelModule,
        DialogModule,
        DividerModule,
        CheckboxModule,
    ],
    declarations: [SettingsCategoriesComponent],
})
export class SettingsCategoriesModule {}
