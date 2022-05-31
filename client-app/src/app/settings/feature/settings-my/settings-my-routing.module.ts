import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsMyComponent } from './settings-my.component';

const routes: Routes = [
    { path: '', component: SettingsMyComponent },
    {
        path: 'items',
        loadChildren: () => import('../settings-my-items/settings-my-items.module').then((m) => m.SettingsMyItemsModule),
    },
    {
        path: 'localizations',
        loadChildren: () =>
            import('../settings-my-localizations/settings-my-localizations.module').then((m) => m.SettingsMyLocalizationsModule),
    },
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
