import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsCategoryDefinitionRoutingModule } from './settings-category-definition-routing.module';
import { SettingsCategoryDefinitionComponent } from './settings-category-definition.component';
@NgModule({
    imports: [CommonModule, SettingsCategoryDefinitionRoutingModule],
    declarations: [SettingsCategoryDefinitionComponent],
})
export class SettingsCategoryDefinitionModule {}
