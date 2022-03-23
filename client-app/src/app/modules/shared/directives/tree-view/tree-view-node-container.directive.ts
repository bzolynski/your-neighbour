import { Directive, ElementRef, ViewContainerRef } from '@angular/core';
import { TreeViewService } from './tree-view.service';

@Directive({
    selector: '[appTreeViewNodeContainer]',
})
export class TreeViewNodeContainerDirective<T> {
    constructor(
        protected treeService: TreeViewService<T>,
        public elementRef: ElementRef<HTMLElement>,
        public viewContainerRef: ViewContainerRef
    ) {}
}
