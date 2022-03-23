import { Component, ElementRef, ViewContainerRef } from '@angular/core';
import { TreeViewService } from '../../../directives';

@Component({
    selector: 'app-tree-view-node-container',
    templateUrl: './tree-view-node-container.component.html',
    styleUrls: ['./tree-view-node-container.component.scss'],
})
export class TreeViewNodeContainerComponent<T> {
    constructor(
        protected treeService: TreeViewService<T>,
        public elementRef: ElementRef<HTMLElement>,
        public viewContainerRef: ViewContainerRef
    ) {}
}
