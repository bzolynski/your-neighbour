import { Directive } from '@angular/core';
import { TreeViewService } from './tree-view.service';

@Directive({
    selector: '[appTreeViewNodeContainer]',
})
export class TreeViewNodeContainerDirective<T> {
    constructor(private treeService: TreeViewService<T>) {
        treeService.nodeContainers.push(this);
    }
}
