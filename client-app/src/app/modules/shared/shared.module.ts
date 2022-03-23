import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TextInputComponent } from './components/inputs/text-input/text-input.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SnackBarContentComponent } from './components/snack-bar-content/snack-bar-content.component';
import { ContainerComponent } from './components/layout/container/container.component';
import {
    TreeViewNodeContainerDirective,
    TreeViewNodeToggleDirective,
    TreeViewRootDirective,
    TreeViewRootGroupDirective,
} from './directives';
import {
    TreeViewNodeComponent,
    TreeViewNodeContainerComponent,
    TreeViewRootComponent,
    TreeViewUnassignedNodeContainerComponent,
} from './components';

@NgModule({
    declarations: [
        TextInputComponent,
        SnackBarContentComponent,
        ContainerComponent,
        TreeViewRootDirective,
        TreeViewNodeToggleDirective,
        TreeViewRootComponent,
        TreeViewRootGroupDirective,
        TreeViewNodeContainerDirective,
        TreeViewNodeComponent,
        TreeViewNodeContainerComponent,
        TreeViewUnassignedNodeContainerComponent,
    ],
    imports: [CommonModule, RouterModule, AngularMaterialModule, ReactiveFormsModule],
    exports: [
        TextInputComponent,
        ContainerComponent,
        TreeViewRootDirective,
        TreeViewNodeToggleDirective,
        TreeViewRootComponent,
        TreeViewRootGroupDirective,
        TreeViewNodeContainerDirective,
        TreeViewNodeComponent,
        TreeViewNodeContainerComponent,
        TreeViewUnassignedNodeContainerComponent,
    ],
})
export class SharedModule {}
