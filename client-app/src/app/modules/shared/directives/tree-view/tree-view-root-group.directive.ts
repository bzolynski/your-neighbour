import { Directive, ElementRef, HostListener, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { ITree } from 'src/app/modules/core/types';
import { TreeViewService } from './tree-view.service';

@Directive({
    selector: '[appTreeViewRootGroup]',
    providers: [TreeViewService],
})
export class TreeViewRootGroupDirective<T> implements OnInit {
    @Input() dragDropAllowed: boolean = false;
    @Output() treeDragEnd: Subject<{ draggedItem: ITree<T>; draggedOverItem: ITree<T> | null }> =
        new Subject();
    constructor(
        private treeService: TreeViewService<T>,
        public elementRef: ElementRef<HTMLElement>
    ) {
        this.treeService.rootContainer = this;
    }
    ngOnInit(): void {
        this.treeService.dragDropAllowed = this.dragDropAllowed;
        this.treeService.treeDragEnd = this.treeDragEnd;
    }

    @HostListener('mousemove', ['$event'])
    mouseOver = (e: MouseEvent) => {
        if (this.treeService.isDragging$) {
            this.treeService.checkDragOver(e);
        }
    };
}
