import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsMyAccountFormComponent } from './settings-my-account-form.component';

const routes: Routes = [{ path: '', component: SettingsMyAccountFormComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SettingsMyAccountFormRoutingModule {}
