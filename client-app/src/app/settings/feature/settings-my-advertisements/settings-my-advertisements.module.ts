import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsMyAdvertisementsRoutingModule } from './settings-my-advertisements-routing.module';
import { SettingsMyAdvertisementsComponent } from './settings-my-advertisements.component';
import { StopPropagationModule } from 'src/app/shared/directives/stop-propagation/stop-propagation.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';

import {
    SettingsMyAdvertisementsEffects,
    settingsMyAdvertisementsReducer,
    SETTINGS_MY_ADVERTISEMENTS_STATE_FEATURE_KEY,
} from '../../data-access/store/settings-my-advertisements';
import { RatingModule } from 'primeng/rating';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RippleModule } from 'primeng/ripple';
import { CardContainerModule } from 'src/app/shared/directives/card-container/card-container.module';
import { InputNumberModule } from 'primeng/inputnumber';
import { OverlayPanelModule } from 'primeng/overlaypanel';
@NgModule({
    imports: [
        CommonModule,
        SettingsMyAdvertisementsRoutingModule,
        StopPropagationModule,
        StoreModule.forFeature(SETTINGS_MY_ADVERTISEMENTS_STATE_FEATURE_KEY, settingsMyAdvertisementsReducer),
        EffectsModule.forFeature([SettingsMyAdvertisementsEffects]),

        TableModule,
        DialogModule,
        RatingModule,
        ToolbarModule,
        ToastModule,
        RadioButtonModule,
        ConfirmDialogModule,
        InputTextModule,
        InputNumberModule,
        ButtonModule,
        FlexLayoutModule,
        RippleModule,
        CardContainerModule,
        OverlayPanelModule,
    ],
    declarations: [SettingsMyAdvertisementsComponent],
    providers: [ConfirmationService],
})
export class SettingsMyAdvertisementsModule {}
