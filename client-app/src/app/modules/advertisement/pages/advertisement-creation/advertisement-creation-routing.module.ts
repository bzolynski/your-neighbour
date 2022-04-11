import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdvertisementCreationComponent } from './advertisement-creation.component';

const routes: Routes = [
    {
        path: '',
        component: AdvertisementCreationComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdvertisementCreationRoutingModule {}
