import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsCategoriesRoutingModule } from './settings-categories-routing.module';
import { SettingsCategoriesComponent } from './settings-categories.component';

import { TreeModule } from 'primeng/tree';
import { SharedModule } from '@shared/shared.module';
import { PanelModule } from 'primeng/panel';
import { DialogModule } from 'primeng/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { DividerModule } from 'primeng/divider';
import { CheckboxModule } from 'primeng/checkbox';
import { BackdropLoadingModule } from '@shared/ui/backdrop-loading/backdrop-loading.module';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SettingsCategoriesRoutingModule,
        BackdropLoadingModule,
        TreeModule,
        SharedModule,
        PanelModule,
        DialogModule,
        DividerModule,
        CheckboxModule,
        ConfirmDialogModule,
    ],
    declarations: [SettingsCategoriesComponent],
})
export class SettingsCategoriesModule {}
