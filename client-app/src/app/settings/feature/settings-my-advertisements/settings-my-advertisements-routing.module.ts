import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsMyAdvertisementsComponent } from './settings-my-advertisements.component';

const routes: Routes = [{ path: '', component: SettingsMyAdvertisementsComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SettingsMyAdvertisementsRoutingModule {}
