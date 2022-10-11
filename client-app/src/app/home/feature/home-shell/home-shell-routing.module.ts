import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedInGuard } from '@core/guards/.';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                pathMatch: 'full',
                loadChildren: () => import('../home/home.module').then((m) => m.HomeModule),
            },
            {
                path: 'welcome',
                canActivate: [LoggedInGuard],
                pathMatch: 'full',
                loadChildren: () => import('../welcome/welcome.module').then((m) => m.WelcomeModule),
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class HomeShellRoutingModule {}
