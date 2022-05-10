import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsMyRoutingModule } from './settings-my-routing.module';
import { SettingsMyComponent } from './settings-my.component';
@NgModule({
    imports: [CommonModule, SettingsMyRoutingModule],
    declarations: [SettingsMyComponent],
})
export class SettingsMyModule {}
