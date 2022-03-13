import { Injectable } from '@angular/core';
import { TreeViewNodeContainerDirective } from './tree-view-node-container.directive';
import { TreeViewNodeDirective } from './tree-view-node.directive';
import { TreeViewRootGroupDirective } from './tree-view-root-group.directive';
import { TreeViewRootDirective } from './tree-view-root.directive';

@Injectable()
export class TreeViewService<T> {
    rootContainer: TreeViewRootGroupDirective<T> | undefined;
    roots: Array<TreeViewRootDirective<T>> = new Array<
        TreeViewRootDirective<T>
    >();
    nodes: Array<TreeViewNodeDirective<T>> = new Array<
        TreeViewNodeDirective<T>
    >();
    nodeContainers: Array<TreeViewNodeContainerDirective<T>> = new Array<
        TreeViewNodeContainerDirective<T>
    >();
    constructor() {}
}
