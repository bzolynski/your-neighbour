import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsAdvertisementsRoutingModule } from './settings-advertisements-routing.module';
import { SettingsAdvertisementsComponent } from './settings-advertisements.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';

import { RatingModule } from 'primeng/rating';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RippleModule } from 'primeng/ripple';
import { InputNumberModule } from 'primeng/inputnumber';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { AdvertisementFormModule } from '../../ui/advertisement-form/advertisement-form.module';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { SharedModule } from '@shared/shared.module';
import {
    SettingsMyAdvertisementsEffects,
    settingsMyAdvertisementsReducer,
    SETTINGS_ADVERTISEMENTS_STATE_FEATURE_KEY,
} from '../../data-access/store/settings-advertisements';
@NgModule({
    imports: [
        CommonModule,
        SettingsAdvertisementsRoutingModule,
        StoreModule.forFeature(SETTINGS_ADVERTISEMENTS_STATE_FEATURE_KEY, settingsMyAdvertisementsReducer),
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
        FlexLayoutModule,
        RippleModule,
        OverlayPanelModule,
        AdvertisementFormModule,
        DynamicDialogModule,
        SharedModule,
    ],
    declarations: [SettingsAdvertisementsComponent],
    providers: [ConfirmationService, DialogService],
})
export class SettingsAdvertisementsModule {}
