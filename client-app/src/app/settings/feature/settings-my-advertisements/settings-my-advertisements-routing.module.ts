import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsMyAdvertisementsComponent } from './settings-my-advertisements.component';

const routes: Routes = [
    {
        path: '',
        component: SettingsMyAdvertisementsComponent,
        children: [
            // {
            //     path: 'add',
            //     loadChildren: () =>
            //         import('../settings-my-advertisements-form/settings-my-advertisements-form.module').then(
            //             (m) => m.SettingsMyAdvertisementsFormModule
            //         ),
            // },
            // {
            //     path: 'edit/:id',
            //     loadChildren: () =>
            //         import('../settings-my-advertisements-form/settings-my-advertisements-form.module').then(
            //             (m) => m.SettingsMyAdvertisementsFormModule
            //         ),
            // },
        ],
    },
    {
        path: 'add',
        loadChildren: () =>
            import('../settings-my-advertisements-form/settings-my-advertisements-form.module').then(
                (m) => m.SettingsMyAdvertisementsFormModule
            ),
    },
    {
        path: 'edit/:id',
        loadChildren: () =>
            import('../settings-my-advertisements-form/settings-my-advertisements-form.module').then(
                (m) => m.SettingsMyAdvertisementsFormModule
            ),
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SettingsMyAdvertisementsRoutingModule {}
