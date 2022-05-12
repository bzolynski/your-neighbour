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
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SettingsMyRoutingModule {}
