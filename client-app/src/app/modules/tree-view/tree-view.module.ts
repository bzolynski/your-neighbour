import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeViewNodeToggleDirective } from './directives';
import {
    TreeViewNodeComponent,
    TreeViewNodeContainerComponent,
    TreeViewPreviewComponent,
    TreeViewRootContainerComponent,
    TreeViewRootContainerGroupComponent,
    TreeViewUnassignedNodeContainerComponent,
} from './components';

// TODO: REBUILD THIS MODULE

@NgModule({
    declarations: [
        TreeViewNodeToggleDirective,
        TreeViewRootContainerComponent,
        TreeViewNodeComponent,
        TreeViewNodeContainerComponent,
        TreeViewUnassignedNodeContainerComponent,
        TreeViewPreviewComponent,
        TreeViewRootContainerGroupComponent,
    ],
    imports: [CommonModule],
    exports: [
        TreeViewNodeToggleDirective,
        TreeViewRootContainerComponent,
        TreeViewNodeComponent,
        TreeViewNodeContainerComponent,
        TreeViewUnassignedNodeContainerComponent,
        TreeViewPreviewComponent,
        TreeViewRootContainerGroupComponent,
    ],
})
export class TreeViewModule {}
