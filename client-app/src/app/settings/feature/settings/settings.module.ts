import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { SettingsSideBarModule } from '../../ui/settings-side-bar/settings-side-bar.module';
import { ElevatedSectionModule } from 'src/app/shared/directives/elevated-section/elevated-section.module';
@NgModule({
    imports: [CommonModule, SettingsRoutingModule, SettingsSideBarModule, ElevatedSectionModule],
    declarations: [SettingsComponent],
})
export class SettingsModule {}
