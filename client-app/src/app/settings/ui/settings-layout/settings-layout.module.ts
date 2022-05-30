import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsLayoutComponent } from './settings-layout.component';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [CommonModule, RouterModule],
    declarations: [SettingsLayoutComponent],
    exports: [SettingsLayoutComponent],
})
export class SettingsLayoutModule {}
