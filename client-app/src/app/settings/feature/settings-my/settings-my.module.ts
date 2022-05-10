import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsMyRoutingModule } from './settings-my-routing.module';
import { SettingsMyComponent } from './settings-my.component';
import { ElevatedSectionModule } from 'src/app/shared/directives/elevated-section/elevated-section.module';
import { RouterModule } from '@angular/router';
@NgModule({
    imports: [CommonModule, SettingsMyRoutingModule, ElevatedSectionModule, RouterModule],
    declarations: [SettingsMyComponent],
})
export class SettingsMyModule {}
