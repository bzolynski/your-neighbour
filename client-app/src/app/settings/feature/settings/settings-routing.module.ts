import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, RoleGuard } from '@guards/.';
import { SettingsComponent } from './settings.component';

const routes: Routes = [
    {
        path: '',
        component: SettingsComponent,
        canActivate: [AuthGuard],
        children: [
            { path: 'my', loadChildren: () => import('../settings-my/settings-my.module').then((m) => m.SettingsMyModule) },
            {
                path: 'categories',
                canActivate: [RoleGuard],
                data: { roles: ['Administrator'] },
                loadChildren: () =>
                    import('../settings-categories/settings-categories.module').then((m) => m.SettingsCategoriesModule),
            },
            {
                path: 'category-definitions',
                canActivate: [RoleGuard],
                data: { roles: ['Administrator'] },
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
export class SettingsRoutingModule {}
