import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsCategoriesComponent } from './settings-categories.component';

const routes: Routes = [
    {
        path: '',
        component: SettingsCategoriesComponent,
        children: [
            {
                path: ':id',
                loadChildren: () =>
                    import('../settings-categories-details/settings-categories-details.module').then(
                        (m) => m.SettingsCategoriesDetailsModule
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
