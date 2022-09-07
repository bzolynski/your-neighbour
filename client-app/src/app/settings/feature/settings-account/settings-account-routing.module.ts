import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsAccountComponent } from './settings-account.component';

const routes: Routes = [
    {
        path: '',
        component: SettingsAccountComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SettingsAccountRoutingModule {}
