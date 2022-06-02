import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsMyAccountComponent } from './settings-my-account.component';

const routes: Routes = [
    {
        path: '',
        component: SettingsMyAccountComponent,
        children: [
            {
                path: 'edit',
                loadChildren: () =>
                    import('../settings-my-account-form/settings-my-account-form.module').then(
                        (m) => m.SettingsMyAccountFormModule
                    ),
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SettingsMyAccountRoutingModule {}
