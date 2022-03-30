import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdvertisementComponent } from './pages/advertisement/advertisement.component';

const routes: Routes = [
    {
        path: '',
        component: AdvertisementComponent,
        children: [],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdvertisementRoutingModule {}
