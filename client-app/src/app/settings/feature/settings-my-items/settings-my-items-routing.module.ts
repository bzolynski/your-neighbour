import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsMyItemsComponent } from './settings-my-items.component';

const routes: Routes = [
    {
        path: '',
        component: SettingsMyItemsComponent,
        children: [
            {
                path: 'add',
                loadChildren: () =>
                    import('../settings-my-items-form/settings-my-items-form.module').then((m) => m.SettingsMyItemsFormModule),
            },
            {
                path: 'edit/:id',
                loadChildren: () =>
                    import('../settings-my-items-form/settings-my-items-form.module').then((m) => m.SettingsMyItemsFormModule),
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SettingsMyItemsRoutingModule {}
