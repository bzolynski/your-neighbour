import { NgModule } from '@angular/core';
import { RouterModule, Routes, UrlSegment } from '@angular/router';
import { SettingsCategoriesComponent } from './settings-categories.component';

const routes: Routes = [
    {
        path: '',
        component: SettingsCategoriesComponent,
        children: [
            {
                path: ':id',
                matcher: (url) =>
                    url.length === 1 && url[0].path !== 'add' && url[0].path !== 'connect'
                        ? {
                              consumed: url,
                              posParams: {
                                  id: new UrlSegment(url[0].path, {}),
                              },
                          }
                        : null,
                loadChildren: () =>
                    import('../settings-categories-details/settings-categories-details.module').then(
                        (m) => m.SettingsCategoriesDetailsModule
                    ),
            },
            {
                path: 'connect',
                loadChildren: () =>
                    import('../settings-categories-connect/settings-categories-connect.module').then(
                        (m) => m.SettingsCategoriesConnectModule
                    ),
            },
            {
                path: 'add',
                pathMatch: 'full',
                loadChildren: () =>
                    import('../settings-categories-form/settings-categories-form.module').then(
                        (m) => m.SettingsCategoriesFormModule
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
