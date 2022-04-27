import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'list',
        pathMatch: 'full',
        loadChildren: async () => (await import('../advertisement-list/advertisement-list.module')).AdvertisementListModule,
    },
    {
        path: 'add',
        pathMatch: 'full',
        loadChildren: async () => (await import('../advertisement-add/advertisement-add.module')).AdvertisementAddModule,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdvertisementShellRoutingModule {}
