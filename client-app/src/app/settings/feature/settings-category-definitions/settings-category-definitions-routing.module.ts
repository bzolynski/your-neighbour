import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsCategoryDefinitionsComponent } from './settings-category-definitions.component';

const routes: Routes = [{ path: '', component: SettingsCategoryDefinitionsComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SettingsCategoryDefinitionsRoutingModule {}
