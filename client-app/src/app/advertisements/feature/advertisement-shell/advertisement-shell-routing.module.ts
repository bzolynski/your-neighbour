import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        loadChildren: () => import('../advertisement-list/advertisement-list.module').then((m) => m.AdvertisementListModule),
    },
    {
        path: 'add',
        pathMatch: 'full',
        loadChildren: () => import('../advertisement-add/advertisement-add.module').then((m) => m.AdvertisementAddModule),
    },
    {
        path: ':id',
        loadChildren: () => import('../advertisement/advertisement.module').then((m) => m.AdvertisementModule),
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdvertisementShellRoutingModule {}
