import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@guards/.';

const routes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        loadChildren: () => import('../settings/settings.module').then((m) => m.SettingsModule),
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SettingsShellRoutingModule {}
