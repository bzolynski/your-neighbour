import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/modules/core/guards/auth.guard';
import { UserDetailsGuard } from 'src/app/shared/guards/user-details.guard';

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
