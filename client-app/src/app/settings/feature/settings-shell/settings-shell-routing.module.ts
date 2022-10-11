import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, RoleGuard } from '@core/guards/.';
import { Role } from '@core/models/user.model';
import { SettingsShellComponent } from './settings-shell.component';

const routes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        component: SettingsShellComponent,
        children: [
            {
                path: '',
                redirectTo: 'account',
                pathMatch: 'full',
            },
            {
                path: 'account',
                loadChildren: () => import('../settings-account/settings-account.module').then((m) => m.SettingsAccountModule),
            },
            {
                path: 'advertisements',
                loadChildren: () =>
                    import('../settings-advertisements/settings-advertisements.module').then(
                        (m) => m.SettingsAdvertisementsModule
                    ),
            },
            {
                path: 'categories',
                canActivate: [RoleGuard],
                data: { roles: ['Administrator'] as Role[] },
                loadChildren: () =>
                    import('../settings-categories/settings-categories.module').then((m) => m.SettingsCategoriesModule),
            },
            {
                path: 'category-definitions',
                canActivate: [RoleGuard],
                data: { roles: ['Administrator'] as Role[] },
                loadChildren: () =>
                    import('../settings-category-definitions/settings-category-definitions.module').then(
                        (m) => m.SettingsCategoryDefinitionsModule
                    ),
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SettingsShellRoutingModule {}
