import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdvertisementDetailsComponent } from './advertisement-details.component';

const routes: Routes = [{ path: '', component: AdvertisementDetailsComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdvertisementDetailsRoutingModule {}
