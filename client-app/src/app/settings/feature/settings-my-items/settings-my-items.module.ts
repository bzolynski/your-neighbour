import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsMyItemsRoutingModule } from './settings-my-items-routing.module';
import { SettingsMyItemsComponent } from './settings-my-items.component';


@NgModule({
  declarations: [
    SettingsMyItemsComponent
  ],
  imports: [
    CommonModule,
    SettingsMyItemsRoutingModule
  ]
})
export class SettingsMyItemsModule { }
