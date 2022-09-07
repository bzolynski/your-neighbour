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
        loadChildren: () => import('../settings-account/settings-account.module').then((m) => m.SettingsAccountModule),
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SettingsMyRoutingModule {}
