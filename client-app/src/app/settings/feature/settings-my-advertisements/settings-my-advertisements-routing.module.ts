import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailsGuard } from 'src/app/shared/guards/user-details.guard';
import { SettingsMyAdvertisementsComponent } from './settings-my-advertisements.component';

const routes: Routes = [
    {
        path: '',
        component: SettingsMyAdvertisementsComponent,
    },
    {
        path: 'add',
        canActivate: [UserDetailsGuard],
        loadChildren: () =>
            import('../settings-my-advertisements-form/settings-my-advertisements-form.module').then(
                (m) => m.SettingsMyAdvertisementsFormModule
            ),
    },
    {
        path: 'edit/:id',
        loadChildren: () =>
            import('../settings-my-advertisements-form/settings-my-advertisements-form.module').then(
                (m) => m.SettingsMyAdvertisementsFormModule
            ),
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SettingsMyAdvertisementsRoutingModule {}
