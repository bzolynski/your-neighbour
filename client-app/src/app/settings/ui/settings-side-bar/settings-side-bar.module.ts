import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsSideBarComponent } from './settings-side-bar.component';
import { PanelMenuModule } from 'primeng/panelmenu';
@NgModule({
    imports: [CommonModule, PanelMenuModule],
    declarations: [SettingsSideBarComponent],
    exports: [SettingsSideBarComponent],
})
export class SettingsSideBarModule {}
