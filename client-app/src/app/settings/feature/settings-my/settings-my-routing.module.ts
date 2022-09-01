import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsMyComponent } from './settings-my.component';

const routes: Routes = [
    { path: '', component: SettingsMyComponent },
    {
        path: 'advertisements',
        loadChildren: () =>
            import('../settings-my-advertisements/settings-my-advertisements.module').then(
                (m) => m.SettingsMyAdvertisementsModule
            ),
    },
    {
        path: 'account',
        loadChildren: () => import('../settings-my-account/settings-my-account.module').then((m) => m.SettingsMyAccountModule),
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SettingsMyRoutingModule {}
