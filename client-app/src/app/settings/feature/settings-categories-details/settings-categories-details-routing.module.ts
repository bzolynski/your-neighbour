import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsCategoriesDetailsComponent } from './settings-categories-details.component';

const routes: Routes = [{ path: '', component: SettingsCategoriesDetailsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsCategoriesDetailsRoutingModule { }
