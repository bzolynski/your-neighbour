import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdvertisementRootComponent, AdvertisementCreationComponent, AdvertisementListComponent } from './pages';

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
                component: AdvertisementCreationComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdvertisementRoutingModule {}
