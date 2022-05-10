import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsShellRoutingModule } from './settings-shell-routing.module';
import { SettingsMyModule } from '../settings-my/settings-my.module';
import { SettingsModule } from '../settings/settings.module';

@NgModule({
    imports: [CommonModule, SettingsShellRoutingModule, SettingsMyModule, SettingsModule],
    declarations: [],
})
export class SettingsShellModule {}
