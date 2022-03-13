import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TextInputComponent } from './components/inputs/text-input/text-input.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SnackBarContentComponent } from './components/snack-bar-content/snack-bar-content.component';
import { ContainerComponent } from './components/layout/container/container.component';
import {
    TreeNodeDirective,
    TreeViewNodeToggleDirective,
    TreeViewOutletDirective,
    TreeViewRootDirective,
} from './directives';
import { TreeViewNodeComponent } from './components';
import {
    DragDropContainerDirective,
    DragDropItemDirective,
} from './directives';
import { DragDropPlaceholderDirective } from './directives/drag-and-drop/drag-drop-placeholder.directive';
import { DragDropPlaceholderComponent } from './components/drag-and-drop/drag-drop-placeholder/drag-drop-placeholder.component';
import { DragDropRootContainerDirective } from './directives/drag-and-drop/drag-drop-root-container.directive';

@NgModule({
    declarations: [
        TextInputComponent,
        SnackBarContentComponent,
        ContainerComponent,
        TreeNodeDirective,
        TreeViewRootDirective,
        TreeViewNodeComponent,
        TreeViewOutletDirective,
        TreeViewNodeToggleDirective,
        DragDropContainerDirective,
        DragDropItemDirective,
        DragDropPlaceholderDirective,
        DragDropPlaceholderComponent,
        DragDropRootContainerDirective,
    ],
    imports: [
        CommonModule,
        RouterModule,
        AngularMaterialModule,
        ReactiveFormsModule,
    ],
    exports: [
        TextInputComponent,
        ContainerComponent,
        TreeNodeDirective,
        TreeViewRootDirective,
        TreeViewNodeComponent,
        TreeViewOutletDirective,
        TreeViewNodeToggleDirective,
        DragDropItemDirective,
        DragDropContainerDirective,
        DragDropPlaceholderDirective,
        DragDropPlaceholderComponent,
        DragDropRootContainerDirective,
    ],
})
export class SharedModule {}
