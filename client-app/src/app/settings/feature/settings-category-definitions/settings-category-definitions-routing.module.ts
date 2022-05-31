import { NgModule } from '@angular/core';
import { RouterModule, Routes, UrlSegment } from '@angular/router';
import { SettingsCategoryDefinitionsComponent } from './settings-category-definitions.component';

const routes: Routes = [
    {
        path: '',
        component: SettingsCategoryDefinitionsComponent,
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
                    import('../settings-category-definitions-details/settings-category-definitions-details.module').then(
                        (m) => m.SettingsCategoryDefinitionsDetailsModule
                    ),
            },
            {
                path: 'add',
                loadChildren: () =>
                    import(
                        '../settings-category-definitions-details-form/settings-category-definitions-details-form.module'
                    ).then((m) => m.SettingsCategoryDefinitionsDetailsFormModule),
            },
            {
                path: ':id/edit',
                loadChildren: () =>
                    import(
                        '../settings-category-definitions-details-form/settings-category-definitions-details-form.module'
                    ).then((m) => m.SettingsCategoryDefinitionsDetailsFormModule),
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SettingsCategoryDefinitionsRoutingModule {}
