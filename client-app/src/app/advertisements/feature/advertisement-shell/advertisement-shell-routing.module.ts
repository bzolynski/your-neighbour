import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
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
