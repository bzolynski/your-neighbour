import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsShellRoutingModule } from './settings-shell-routing.module';
import { SettingsModule } from '../settings/settings.module';

@NgModule({
    imports: [CommonModule, SettingsShellRoutingModule, SettingsModule],
    declarations: [],
})
export class SettingsShellModule {}
