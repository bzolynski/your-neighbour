import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsAccountRoutingModule } from './settings-account-routing.module';
import { SettingsAccountComponent } from './settings-account.component';
import { ElevatedSectionModule } from 'src/app/shared/directives/elevated-section/elevated-section.module';
import { MatButtonModule } from '@angular/material/button';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
    SettingsMyAccountEffects,
    settingsMyAccountReducer,
    SETTINGS_MY_ACCOUNT_STATE_FEATURE_KEY,
} from '../../data-access/store/settings-my-account';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { StopPropagationModule } from 'src/app/shared/directives/stop-propagation/stop-propagation.module';
import { BackdropLoadingModule } from 'src/app/shared/ui/backdrop-loading/backdrop-loading.module';
import { SettingsLayoutModule } from '../../ui/settings-layout/settings-layout.module';
import { SettingsLayoutContentModule } from '../../ui/settings-layout-content/settings-layout-content.module';
import { SettingsLayoutSideContentModule } from '../../ui/settings-layout-side-content/settings-layout-side-content.module';
import { SettingsLayoutTopbarModule } from '../../ui/settings-layout-topbar/settings-layout-topbar.module';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { TextInputModule } from '@shared/ui/text-input/text-input.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SettingsAccountStore } from './settings-account.store';
import { SharedModule } from '@shared/shared.module';
@NgModule({
    imports: [
        CommonModule,
        SettingsAccountRoutingModule,
        ElevatedSectionModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
        SettingsLayoutModule,
        SettingsLayoutContentModule,
        SettingsLayoutTopbarModule,
        SettingsLayoutSideContentModule,
        StopPropagationModule,
        BackdropLoadingModule,
        StoreModule.forFeature(SETTINGS_MY_ACCOUNT_STATE_FEATURE_KEY, settingsMyAccountReducer),
        EffectsModule.forFeature([SettingsMyAccountEffects]),

        PanelModule,
        ButtonModule,
        TableModule,
        DropdownModule,
        TextInputModule,
        ReactiveFormsModule,
        SharedModule,
    ],
    declarations: [SettingsAccountComponent],
    providers: [SettingsAccountStore],
})
export class SettingsAccountModule {}
