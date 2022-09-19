import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsCategoryDefinitionsRoutingModule } from './settings-category-definitions-routing.module';
import { SettingsCategoryDefinitionsComponent } from './settings-category-definitions.component';

import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { SharedModule } from '@shared/shared.module';
import { DialogModule } from 'primeng/dialog';
import { CheckboxModule } from 'primeng/checkbox';
import { DividerModule } from 'primeng/divider';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SettingsCategoryDefinitionsRoutingModule,
        SharedModule,
        PanelModule,
        TableModule,
        DialogModule,
        CheckboxModule,
        DividerModule,
    ],
    declarations: [SettingsCategoryDefinitionsComponent],
})
export class SettingsCategoryDefinitionsModule {}
