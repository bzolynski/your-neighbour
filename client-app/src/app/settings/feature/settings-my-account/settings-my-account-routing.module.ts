import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsMyAccountComponent } from './settings-my-account.component';

const routes: Routes = [{ path: '', component: SettingsMyAccountComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SettingsMyAccountRoutingModule {}
