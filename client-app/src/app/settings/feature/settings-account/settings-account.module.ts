import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsAccountRoutingModule } from './settings-account-routing.module';
import { SettingsAccountComponent } from './settings-account.component';

import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@NgModule({
    imports: [
        CommonModule,
        SettingsAccountRoutingModule,
        PanelModule,
        TableModule,
        DropdownModule,
        ReactiveFormsModule,
        SharedModule,
        OverlayPanelModule,
        TooltipModule,
        DialogModule,
        DividerModule,
        ConfirmDialogModule,
    ],
    declarations: [SettingsAccountComponent],
})
export class SettingsAccountModule {}
