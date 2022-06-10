import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './modules/core/guards/auth.guard';

const routes: Routes = [
    { path: '', loadChildren: () => import('./home/feature/home-shell/home-shell.module').then((m) => m.HomeShellModule) },
    {
        path: 'settings',
        canActivate: [AuthGuard],
        loadChildren: () => import('./settings/feature/settings-shell/settings-shell.module').then((m) => m.SettingsShellModule),
    },
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
