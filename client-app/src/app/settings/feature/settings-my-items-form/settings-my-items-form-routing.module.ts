import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsMyItemsFormComponent } from './settings-my-items-form.component';

const routes: Routes = [{ path: '', component: SettingsMyItemsFormComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SettingsMyItemsFormRoutingModule {}
