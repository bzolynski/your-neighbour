import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsAccountRoutingModule } from './settings-account-routing.module';
import { SettingsAccountComponent } from './settings-account.component';

import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { TextInputModule } from '@shared/ui/text-input/text-input.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TooltipModule } from 'primeng/tooltip';
import { MaskInputModule } from '@shared/ui/mask-input/mask-input.module';
@NgModule({
    imports: [
        CommonModule,
        SettingsAccountRoutingModule,
        PanelModule,
        ButtonModule,
        TableModule,
        DropdownModule,
        TextInputModule,
        ReactiveFormsModule,
        SharedModule,
        OverlayPanelModule,
        TooltipModule,
        MaskInputModule,
    ],
    declarations: [SettingsAccountComponent],
})
export class SettingsAccountModule {}
