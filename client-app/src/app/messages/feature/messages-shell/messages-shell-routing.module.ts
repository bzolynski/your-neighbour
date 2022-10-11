import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, UserDetailsGuard } from '@core/guards/.';

const routes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard, UserDetailsGuard],
        loadChildren: () => import('../messages/messages.module').then((m) => m.MessagesModule),
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MessagesShellRoutingModule {}
