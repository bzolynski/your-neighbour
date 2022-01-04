import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './pages/settings/settings.component';
import { SettingsSideBarComponent } from './components/settings-side-bar/settings-side-bar.component';
import { SettingsSideBarGroupComponent } from './components/settings-side-bar-group/settings-side-bar-group.component';
import { CategoryDefinitionSettingsComponent } from './pages/category-definition-settings/category-definition-settings.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { RouterModule } from '@angular/router';
import { CategoryDefinitionFormComponent } from './components/category-definition-form/category-definition-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryDefinitionListComponent } from './components/category-definition-list/category-definition-list.component';
import { CategoryDefinitionListItemComponent } from './components/category-definition-list-item/category-definition-list-item.component';
import { CategoryDefinitionDetailsComponent } from './components/category-definition-details/category-definition-details.component';
import { CategorySettingsComponent } from './pages/category-settings/category-settings.component';
import { SettingsLayoutComponent } from './components/settings-layout/settings-layout.component';

@NgModule({
	declarations: [
		SettingsComponent,
		SettingsSideBarComponent,
		SettingsSideBarGroupComponent,
		CategoryDefinitionSettingsComponent,
		CategoryDefinitionFormComponent,
        CategoryDefinitionListComponent,
        CategoryDefinitionListItemComponent,
        CategoryDefinitionDetailsComponent,
        CategorySettingsComponent,
        SettingsLayoutComponent
	],
	imports: [ CommonModule, RouterModule, SettingsRoutingModule, FormsModule, ReactiveFormsModule ]
})
export class SettingsModule {}
