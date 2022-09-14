import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsAdvertisementsComponent } from './settings-advertisements.component';

const routes: Routes = [
    {
        path: '',
        component: SettingsAdvertisementsComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SettingsAdvertisementsRoutingModule {}
