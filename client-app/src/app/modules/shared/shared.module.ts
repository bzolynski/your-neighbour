import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TextInputComponent } from './components/inputs/text-input/text-input.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SnackBarContentComponent } from './components/snack-bar-content/snack-bar-content.component';
import { ContainerComponent } from './components/layout/container/container.component';
import { TreeViewNodeToggleDirective } from './directives';
import {
    TreeViewNodeComponent,
    TreeViewNodeContainerComponent,
    TreeViewPreviewComponent,
    TreeViewRootContainerComponent,
    TreeViewRootContainerGroupComponent,
    TreeViewUnassignedNodeContainerComponent,
} from './components';

@NgModule({
    declarations: [
        TextInputComponent,
        SnackBarContentComponent,
        ContainerComponent,
        TreeViewNodeToggleDirective,
        TreeViewRootContainerComponent,
        TreeViewNodeComponent,
        TreeViewNodeContainerComponent,
        TreeViewUnassignedNodeContainerComponent,
        TreeViewPreviewComponent,
        TreeViewRootContainerGroupComponent,
    ],
    imports: [CommonModule, RouterModule, AngularMaterialModule, ReactiveFormsModule],
    exports: [
        TextInputComponent,
        ContainerComponent,
        TreeViewNodeToggleDirective,
        TreeViewRootContainerComponent,
        TreeViewNodeComponent,
        TreeViewNodeContainerComponent,
        TreeViewUnassignedNodeContainerComponent,
        TreeViewPreviewComponent,
        TreeViewRootContainerGroupComponent,
    ],
})
export class SharedModule {}
