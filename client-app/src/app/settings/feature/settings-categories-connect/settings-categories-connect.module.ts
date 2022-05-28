import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsCategoriesConnectRoutingModule } from './settings-categories-connect-routing.module';
import { SettingsCategoriesConnectComponent } from './settings-categories-connect.component';
@NgModule({
    imports: [CommonModule, SettingsCategoriesConnectRoutingModule],
    declarations: [SettingsCategoriesConnectComponent],
})
export class SettingsCategoriesConnectModule {}
