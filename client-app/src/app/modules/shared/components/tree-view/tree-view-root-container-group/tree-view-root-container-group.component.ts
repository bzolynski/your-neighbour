import { Component, ElementRef, HostListener, Input, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';
import { ITree } from 'src/app/modules/core/types';
import { TreeViewService } from '../../../directives';

@Component({
    selector: 'app-tree-view-root-container-group',
    templateUrl: './tree-view-root-container-group.component.html',
    styleUrls: ['./tree-view-root-container-group.component.scss'],
    providers: [TreeViewService],
})
export class TreeViewRootContainerGroupComponent<T> implements OnInit {
    @Input() dragDropAllowed: boolean = false;
    @Output() treeDragEnd: Subject<{ draggedItem: ITree<T>; draggedOverItem: ITree<T> | null }> = new Subject();
    @ViewChild('previewContainer', { static: true, read: ViewContainerRef }) previewContainerRef!: ViewContainerRef;
    constructor(private treeService: TreeViewService<T>, public elementRef: ElementRef<HTMLElement>) {
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
