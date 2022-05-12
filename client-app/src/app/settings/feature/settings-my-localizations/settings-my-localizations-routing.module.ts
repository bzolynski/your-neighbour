import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsMyLocalizationsComponent } from './settings-my-localizations.component';

const routes: Routes = [{ path: '', component: SettingsMyLocalizationsComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SettingsMyLocalizationsRoutingModule {}
