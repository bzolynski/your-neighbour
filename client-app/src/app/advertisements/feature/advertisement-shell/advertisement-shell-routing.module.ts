import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/modules/core/guards/auth.guard';

const routes: Routes = [
    {
        path: 'add',
        canActivate: [AuthGuard],
        pathMatch: 'full',
        loadChildren: () => import('../advertisement-add/advertisement-add.module').then((m) => m.AdvertisementAddModule),
    },
    {
        path: 'details/:id',
        loadChildren: () => import('../advertisement/advertisement.module').then((m) => m.AdvertisementModule),
    },
    {
        path: ':id',
        pathMatch: 'full',
        loadChildren: () => import('../advertisement-list/advertisement-list.module').then((m) => m.AdvertisementListModule),
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdvertisementShellRoutingModule {}
