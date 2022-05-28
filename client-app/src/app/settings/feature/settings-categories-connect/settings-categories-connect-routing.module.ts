import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsCategoriesConnectComponent } from './settings-categories-connect.component';

const routes: Routes = [{ path: '', component: SettingsCategoriesConnectComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SettingsCategoriesConnectRoutingModule {}
