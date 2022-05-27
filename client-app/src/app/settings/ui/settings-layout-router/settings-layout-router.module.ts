import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsLayoutRouterComponent } from './settings-layout-router.component';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [CommonModule, RouterModule],
    declarations: [SettingsLayoutRouterComponent],
    exports: [SettingsLayoutRouterComponent],
})
export class SettingsLayoutRouterModule {}
