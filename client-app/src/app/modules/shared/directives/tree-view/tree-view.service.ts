import { Injectable, Renderer2 } from '@angular/core';
import { TreeViewNodeComponent } from '../../components/tree-view/tree-view-node/tree-view-node.component';
import { TreeViewNodeContainerDirective } from './tree-view-node-container.directive';
import { TreeViewRootGroupDirective } from './tree-view-root-group.directive';
import { TreeViewRootDirective } from './tree-view-root.directive';

@Injectable()
export class TreeViewService<T> {
    rootContainer: TreeViewRootGroupDirective<T> | undefined;
    roots: Array<TreeViewRootDirective<T>> = new Array<
        TreeViewRootDirective<T>
    >();
    nodes: Array<TreeViewNodeComponent<T>> = new Array<
        TreeViewNodeComponent<T>
    >();
    nodeContainers: Array<TreeViewNodeContainerDirective<T>> = new Array<
        TreeViewNodeContainerDirective<T>
    >();
    constructor(private renderer: Renderer2) {}
}
