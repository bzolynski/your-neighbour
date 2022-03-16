import { Directive, ElementRef, HostListener } from '@angular/core';
import { TreeViewService } from './tree-view.service';

@Directive({
    selector: '[appTreeViewRootGroup]',
    providers: [TreeViewService],
})
export class TreeViewRootGroupDirective<T> {
    constructor(
        private treeService: TreeViewService<T>,
        public elementRef: ElementRef<HTMLElement>
    ) {
        this.treeService.rootContainer = this;
    }

    @HostListener('mousemove', ['$event'])
    mouseOver = (e: MouseEvent) => {
        if (this.treeService.dragging$) {
            this.treeService.checkDragOver(e);
        }
    };
}
