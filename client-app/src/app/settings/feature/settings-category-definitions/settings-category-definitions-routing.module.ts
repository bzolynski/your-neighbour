import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsCategoryDefinitionsComponent } from './settings-category-definitions.component';

const routes: Routes = [
    {
        path: '',
        component: SettingsCategoryDefinitionsComponent,
        children: [
            {
                path: ':id',
                loadChildren: () =>
                    import('../settings-category-definitions-details/settings-category-definitions-details.module').then(
                        (m) => m.SettingsCategoryDefinitionsDetailsModule
                    ),
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SettingsCategoryDefinitionsRoutingModule {}
