import { Directive } from '@angular/core';
import { TreeViewService } from './tree-view.service';

@Directive({
    selector: '[appTreeViewRootGroup]',
    providers: [TreeViewService],
})
export class TreeViewRootGroupDirective<T> {
    constructor(private treeService: TreeViewService<T>) {
        this.treeService.rootContainer = this;
    }
}
