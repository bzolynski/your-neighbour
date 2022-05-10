import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsMyComponent } from './settings-my.component';

const routes: Routes = [
    { path: '', component: SettingsMyComponent },
    {
        path: 'items',
        loadChildren: () => import('../settings-my-items/settings-my-items.module').then((m) => m.SettingsMyItemsModule),
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SettingsMyRoutingModule {}
