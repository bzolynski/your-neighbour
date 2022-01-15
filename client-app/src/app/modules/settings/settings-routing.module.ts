import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
	CategoryDefinitionDetailsComponent,
	CategoryDefinitionFormComponent,
	CategoryDetailsComponent,
	CategoryFormComponent
} from './components';
import { CategoryConnectionsEditComponent } from './components/category/category-connections-edit/category-connections-edit.component';
import {
	CategoryDefinitionSettingsComponent,
	CategorySettingsComponent,
	SettingsComponent
} from './pages';

const routes: Routes = [
	{
		path: '',
		component: SettingsComponent,
		children: [
			{
				path: 'category-definition',
				component: CategoryDefinitionSettingsComponent,
				children: [
					{
						path: 'new',
						pathMatch: 'full',
						component: CategoryDefinitionFormComponent
					},
					{
						path: ':id',
						component: CategoryDefinitionDetailsComponent
					},
					{
						path: ':id/edit',
						component: CategoryDefinitionFormComponent
					}
				]
			},
			{
				path: 'category',
				component: CategorySettingsComponent,
				children: [
					{
						path: 'connections',
						component: CategoryConnectionsEditComponent
					},
					{
						path: 'new',
						pathMatch: 'full',
						component: CategoryFormComponent
					},
					{
						path: ':id',
						component: CategoryDetailsComponent
					},
					{
						path: ':id/edit',
						component: CategoryFormComponent
					}
				]
			}
		]
	}
];

@NgModule({
	imports: [ RouterModule.forChild(routes) ],
	exports: [ RouterModule ]
})
export class SettingsRoutingModule {}
