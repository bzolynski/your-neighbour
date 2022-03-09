import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsRoutingModule } from './settings-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    CategoryDefinitionDetailsComponent,
    CategoryDefinitionFormComponent,
    CategoryDefinitionListComponent,
    CategoryDefinitionListItemComponent,
    CategoryListComponent,
    CategoryListItemComponent,
    SettingsLayoutComponent,
    SettingsSideBarComponent,
} from './components';
import {
    CategoryDefinitionSettingsComponent,
    CategorySettingsComponent,
    SettingsComponent,
} from './pages';
import { CategoryDetailsComponent } from './components/category/category-details/category-details.component';
import { CategoryFormComponent } from './components/category/category-form/category-form.component';
import { SharedModule } from '../shared/shared.module';
import { CategoryConnectionsEditComponent } from './components/category/category-connections-edit/category-connections-edit.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';

@NgModule({
    declarations: [
        SettingsComponent,
        SettingsSideBarComponent,
        CategoryDefinitionSettingsComponent,
        CategoryDefinitionFormComponent,
        CategoryDefinitionListComponent,
        CategoryDefinitionListItemComponent,
        CategoryDefinitionDetailsComponent,
        CategorySettingsComponent,
        SettingsLayoutComponent,
        CategoryListComponent,
        CategoryListItemComponent,
        CategoryDetailsComponent,
        CategoryFormComponent,
        CategoryConnectionsEditComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        SettingsRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        AngularMaterialModule,
    ],
})
export class SettingsModule {}
