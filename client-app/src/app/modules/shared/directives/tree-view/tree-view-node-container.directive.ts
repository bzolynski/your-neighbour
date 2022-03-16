import { Directive, ElementRef, ViewContainerRef } from '@angular/core';
import { TreeViewService } from './tree-view.service';

@Directive({
    selector: '[appTreeViewNodeContainer]',
})
export class TreeViewNodeContainerDirective<T> {
    constructor(
        private treeService: TreeViewService<T>,
        public elementRef: ElementRef<HTMLElement>,
        public viewContainerRef: ViewContainerRef
    ) {
        treeService.nodeContainers.push(this);
    }
}
