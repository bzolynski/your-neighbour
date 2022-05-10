import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsMyItemsComponent } from './settings-my-items.component';

const routes: Routes = [{ path: '', component: SettingsMyItemsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsMyItemsRoutingModule { }
