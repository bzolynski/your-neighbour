import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { CanDeactivateGuard } from '../core/guards/can-deactivate.guard';
import {
    CategoryDefinitionDetailsComponent,
    CategoryDefinitionFormComponent,
    CategoryDetailsComponent,
    CategoryFormComponent,
} from './components';
import { CategoryConnectionsEditComponent } from './components/category/category-connections-edit/category-connections-edit.component';
import { SettingsCategoryDefinitionComponent, SettingsCategoryComponent, SettingsRootComponent } from './pages';

const routes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
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
            {
                path: 'category',
                component: SettingsCategoryComponent,
                children: [
                    {
                        path: 'connections',
                        component: CategoryConnectionsEditComponent,
                        canDeactivate: [CanDeactivateGuard],
                    },
                    {
                        path: 'new',
                        pathMatch: 'full',
                        component: CategoryFormComponent,
                    },
                    {
                        path: ':id',
                        component: CategoryDetailsComponent,
                    },
                    {
                        path: ':id/edit',
                        component: CategoryFormComponent,
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
