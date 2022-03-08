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
    TreeViewOutletDirective,
    TreeViewRootDirective,
} from './directives';
import { TreeViewNodeComponent } from './components';

@NgModule({
    declarations: [
        TextInputComponent,
        SnackBarContentComponent,
        ContainerComponent,
        TreeNodeDirective,
        TreeViewRootDirective,
        TreeViewNodeComponent,
        TreeViewOutletDirective,
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
    ],
})
export class SharedModule {}
