import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryDefinitionDetailsComponent } from './components/category-definition-details/category-definition-details.component';
import { CategoryDefinitionFormComponent } from './components/category-definition-form/category-definition-form.component';
import { CategoryDefinitionSettingsComponent } from './pages/category-definition-settings/category-definition-settings.component';
import { CategorySettingsComponent } from './pages/category-settings/category-settings.component';
import { SettingsComponent } from './pages/settings/settings.component';

const routes: Routes = [
	{
		path: '',
		component: SettingsComponent,
		children: [
			{
				path: 'categoryDefinition',
				component: CategoryDefinitionSettingsComponent,
				children: [
					{
						path: ':id',
						component: CategoryDefinitionDetailsComponent
					},
					{
						path: 'form/new',
						component: CategoryDefinitionFormComponent
					},
					{
						path: 'form/:id',
						component: CategoryDefinitionFormComponent
					}
				]
			},
			{
				path: 'category',
				component: CategorySettingsComponent,
				children: []
			}
		]
	}
];

@NgModule({
	imports: [ RouterModule.forChild(routes) ],
	exports: [ RouterModule ]
})
export class SettingsRoutingModule {}
