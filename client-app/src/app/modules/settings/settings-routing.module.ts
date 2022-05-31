import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsRootComponent } from './pages';

const routes: Routes = [
    {
        path: '',
        component: SettingsRootComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SettingsRoutingModule {}
