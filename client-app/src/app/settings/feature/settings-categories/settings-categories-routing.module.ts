import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsCategoriesComponent } from './settings-categories.component';

const routes: Routes = [
    {
        path: '',
        component: SettingsCategoriesComponent,
        children: [
            {
                path: 'add',
                loadChildren: () =>
                    import('../settings-categories-details/settings-categories-details.module').then(
                        (m) => m.SettingsCategoriesDetailsModule
                    ),
            },
            {
                path: ':id',
                loadChildren: () =>
                    import('../settings-categories-details/settings-categories-details.module').then(
                        (m) => m.SettingsCategoriesDetailsModule
                    ),
            },
            {
                path: ':id/edit',
                loadChildren: () =>
                    import('../settings-categories-form/settings-categories-form.module').then(
                        (m) => m.SettingsCategoriesFormModule
                    ),
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SettingsCategoriesRoutingModule {}
