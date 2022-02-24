import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsRoutingModule } from './settings-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    CategoryConnectionsEditComponent,
    CategoryDefinitionDetailsComponent,
    CategoryDefinitionFormComponent,
    CategoryDefinitionListComponent,
    CategoryDefinitionListItemComponent,
    CategoryDetailsComponent,
    CategoryFormComponent,
    CategoryListComponent,
    CategoryListItemComponent,
    CategoryTreeComponent,
    CategoryTreeItemComponent,
    SettingsLayoutComponent,
    SettingsSideBarComponent,
} from './components';
import {
    CategoryDefinitionSettingsComponent,
    CategorySettingsComponent,
    SettingsComponent,
} from './pages';
import { SharedModule } from '../shared/shared.module';
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
        CategoryTreeComponent,
        CategoryTreeItemComponent,
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
