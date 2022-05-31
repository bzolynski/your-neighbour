import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsCategoryDefinitionsDetailsFormComponent } from './settings-category-definitions-details-form.component';

const routes: Routes = [{ path: '', component: SettingsCategoryDefinitionsDetailsFormComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SettingsCategoryDefinitionsDetailsFormRoutingModule {}
