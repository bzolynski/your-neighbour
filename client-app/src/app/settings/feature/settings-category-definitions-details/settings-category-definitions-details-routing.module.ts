import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsCategoryDefinitionsDetailsComponent } from './settings-category-definitions-details.component';

const routes: Routes = [{ path: '', component: SettingsCategoryDefinitionsDetailsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsCategoryDefinitionsDetailsRoutingModule { }
