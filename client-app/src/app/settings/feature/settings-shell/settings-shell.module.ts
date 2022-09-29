import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsShellRoutingModule } from './settings-shell-routing.module';
import { SettingsSideBarModule } from '../../ui/settings-side-bar/settings-side-bar.module';
import { SharedModule } from '@shared/shared.module';
import { SettingsShellComponent } from './settings-shell.component';

@NgModule({
    imports: [CommonModule, SettingsShellRoutingModule, SettingsSideBarModule, SharedModule],
    declarations: [SettingsShellComponent],
})
export class SettingsShellModule {}
