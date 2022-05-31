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
        StopPropagationModule,
        BackdropLoadingModule,
        StoreModule.forFeature(SETTINGS_MY_ACCOUNT_STATE_FEATURE_KEY, settingsMyAccountReducer),
        EffectsModule.forFeature([SettingsMyAccountEffects]),
    ],
    declarations: [SettingsMyAccountComponent],
})
export class SettingsMyAccountModule {}
