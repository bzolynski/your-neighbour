import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsAccountComponent } from './settings-account.component';

const routes: Routes = [
    {
        path: '',
        component: SettingsAccountComponent,
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
export class SettingsAccountRoutingModule {}
