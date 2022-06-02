import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsMyAccountRoutingModule } from './settings-my-account-routing.module';
import { SettingsMyAccountComponent } from './settings-my-account.component';
import { ElevatedSectionModule } from 'src/app/shared/directives/elevated-section/elevated-section.module';
import { MatButtonModule } from '@angular/material/button';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
    SettingsMyAccountEffects,
    settingsMyAccountReducer,
    SETTINGS_MY_ACCOUNT_STATE_FEATURE_KEY,
} from '../../data-access/store/settings-my-account';
import { ListContainerModule } from 'src/app/shared/ui/list-container/list-container.module';
import { CardModule } from 'src/app/shared/ui/card/card.module';
import { MatIconModule } from '@angular/material/icon';
import { CardContentModule } from 'src/app/shared/ui/card-content/card-content.module';
import { MatDialogModule } from '@angular/material/dialog';
import { LocalizationFormModule } from 'src/app/shared/ui/localization-form/localization-form.module';
import { StopPropagationModule } from 'src/app/shared/directives/stop-propagation/stop-propagation.module';
import { BackdropLoadingModule } from 'src/app/shared/ui/backdrop-loading/backdrop-loading.module';
import { SettingsLayoutModule } from '../../ui/settings-layout/settings-layout.module';
import { SettingsLayoutContentModule } from '../../ui/settings-layout-content/settings-layout-content.module';
import { SettingsLayoutSideContentModule } from '../../ui/settings-layout-side-content/settings-layout-side-content.module';
import { SettingsLayoutTopbarModule } from '../../ui/settings-layout-topbar/settings-layout-topbar.module';
@NgModule({
    imports: [
        CommonModule,
        SettingsMyAccountRoutingModule,
        ElevatedSectionModule,
        MatButtonModule,
        ListContainerModule,
        CardModule,
        CardContentModule,
        MatIconModule,
        MatDialogModule,
        LocalizationFormModule,
        SettingsLayoutModule,
        SettingsLayoutContentModule,
        SettingsLayoutTopbarModule,
        SettingsLayoutSideContentModule,
        StopPropagationModule,
        BackdropLoadingModule,
        StoreModule.forFeature(SETTINGS_MY_ACCOUNT_STATE_FEATURE_KEY, settingsMyAccountReducer),
        EffectsModule.forFeature([SettingsMyAccountEffects]),
    ],
    declarations: [SettingsMyAccountComponent],
})
export class SettingsMyAccountModule {}
