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
import { SettingsCategoryDefinitionComponent, SettingsCategoryComponent, SettingsRootComponent } from './pages';
import { CategoryDetailsComponent } from './components/category/category-details/category-details.component';
import { CategoryFormComponent } from './components/category/category-form/category-form.component';
import { SharedModule } from '../shared/shared.module';
import { CategoryConnectionsEditComponent } from './components/category/category-connections-edit/category-connections-edit.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TreeViewModule } from '../tree-view/tree-view.module';
import { CoreModule } from '../core/core.module';
import { TextInputModule } from 'src/app/shared/ui/text-input/text-input.module';
import { ElevatedSectionModule } from 'src/app/shared/directives/elevated-section/elevated-section.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        SettingsRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        AngularMaterialModule,
        FontAwesomeModule,
        TreeViewModule,
        CoreModule,
        TextInputModule,
        ElevatedSectionModule,
    ],
    declarations: [
        SettingsRootComponent,
        SettingsSideBarComponent,
        SettingsCategoryDefinitionComponent,
        CategoryDefinitionFormComponent,
        CategoryDefinitionListComponent,
        CategoryDefinitionListItemComponent,
        CategoryDefinitionDetailsComponent,
        SettingsCategoryComponent,
        SettingsLayoutComponent,
        CategoryListComponent,
        CategoryListItemComponent,
        CategoryDetailsComponent,
        CategoryFormComponent,
        CategoryConnectionsEditComponent,
    ],
})
export class SettingsModule {}
