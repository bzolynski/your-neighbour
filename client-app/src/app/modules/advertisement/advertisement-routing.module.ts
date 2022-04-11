import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdvertisementRootComponent, AdvertisementListComponent } from './pages';

const routes: Routes = [
    {
        path: '',
        component: AdvertisementRootComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                component: AdvertisementListComponent,
            },
            {
                path: 'new',
                loadChildren: () =>
                    import('./pages/advertisement-creation/advertisement-creation.module').then(
                        (m) => m.AdvertisementCreationModule
                    ),
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdvertisementRoutingModule {}
