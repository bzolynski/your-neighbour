import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanDeactivateGuard } from '@guards/.';
import { SettingsMyAdvertisementsFormComponent } from './settings-my-advertisements-form.component';

const routes: Routes = [{ path: '', component: SettingsMyAdvertisementsFormComponent, canDeactivate: [CanDeactivateGuard] }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SettingsMyAdvertisementsFormRoutingModule {}
