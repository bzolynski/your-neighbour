import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MessagesComponent } from './messages.component';

const routes: Routes = [
    {
        path: '',
        component: MessagesComponent,
        children: [
            { path: ':id', loadChildren: () => import('../open-message/open-message.module').then((m) => m.OpenMessageModule) },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MessagesRoutingModule {}
