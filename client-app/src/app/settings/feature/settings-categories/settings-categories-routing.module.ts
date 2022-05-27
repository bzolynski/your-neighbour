import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsCategoriesComponent } from './settings-categories.component';

const routes: Routes = [{ path: '', component: SettingsCategoriesComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SettingsCategoriesRoutingModule {}
