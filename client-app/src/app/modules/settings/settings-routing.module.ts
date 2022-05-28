import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryDefinitionDetailsComponent, CategoryDefinitionFormComponent } from './components';
import { SettingsCategoryDefinitionComponent, SettingsRootComponent } from './pages';

const routes: Routes = [
    {
        path: '',
        component: SettingsRootComponent,
        children: [
            {
                path: 'category-definition',
                component: SettingsCategoryDefinitionComponent,
                children: [
                    {
                        path: 'new',
                        pathMatch: 'full',
                        component: CategoryDefinitionFormComponent,
                    },
                    {
                        path: ':id',
                        component: CategoryDefinitionDetailsComponent,
                    },
                    {
                        path: ':id/edit',
                        component: CategoryDefinitionFormComponent,
                    },
                ],
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SettingsRoutingModule {}
