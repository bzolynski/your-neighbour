import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./modules/home/home.module').then((m) => m.HomeModule),
    },
    {
        path: 'settings',
        loadChildren: () => import('./settings/feature/settings-shell/settings-shell.module').then((m) => m.SettingsShellModule),
    },
    // {
    //     path: 'settings',
    //     loadChildren: () => import('./modules/settings/settings.module').then((m) => m.SettingsModule),
    // },
    {
        path: 'advertisements',
        loadChildren: () =>
            import('./advertisements/feature/advertisement-shell/advertisement-shell.module').then(
                (m) => m.AdvertisementShellModule
            ),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
