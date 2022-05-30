import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsCategoryDefinitionsRoutingModule } from './settings-category-definitions-routing.module';
import { SettingsCategoryDefinitionsComponent } from './settings-category-definitions.component';
@NgModule({
    declarations: [SettingsCategoryDefinitionsComponent],
    imports: [CommonModule, SettingsCategoryDefinitionsRoutingModule],
})
export class SettingsCategoryDefinitionsModule {}
