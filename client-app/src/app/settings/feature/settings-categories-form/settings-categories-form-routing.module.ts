import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanDeactivateGuard } from 'src/app/modules/core/guards/can-deactivate.guard';
import { SettingsCategoriesFormComponent } from './settings-categories-form.component';

const routes: Routes = [{ path: '', component: SettingsCategoriesFormComponent, canDeactivate: [CanDeactivateGuard] }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SettingsCategoriesFormRoutingModule {}
