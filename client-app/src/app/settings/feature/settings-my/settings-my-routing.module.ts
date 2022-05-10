import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsMyComponent } from './settings-my.component';

const routes: Routes = [{ path: '', component: SettingsMyComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SettingsMyRoutingModule {}
