import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './settings.component';

const routes: Routes = [
    {
        path: '',
        component: SettingsComponent,
        children: [
            { path: 'my', loadChildren: () => import('../settings-my/settings-my.module').then((m) => m.SettingsMyModule) },
            {
                path: 'category-definition',
                loadChildren: () =>
                    import('../settings-category-definition/settings-category-definition.module').then(
                        (m) => m.SettingsCategoryDefinitionModule
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
