import { Component, ElementRef, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { DragEndEventProps } from '../../models/drag-end-event-props.model';
import { TreeViewService } from '../../services';

@Component({
    selector: 'app-tree-view-root-container-group',
    templateUrl: './tree-view-root-container-group.component.html',
    styleUrls: ['./tree-view-root-container-group.component.scss'],
    providers: [TreeViewService],
})
export class TreeViewRootContainerGroupComponent<T> implements OnInit {
    @Input() dragDropAllowed: boolean = false;
    @Output() treeDragEnd: Subject<DragEndEventProps<T>> = new Subject();

    // private members
    constructor(private treeService: TreeViewService<T>, public elementRef: ElementRef<HTMLElement>) {
        this.treeService.rootGroupContainer = this;
    }

    ngOnInit(): void {
        this.treeService.dragDropAllowed = this.dragDropAllowed;
        this.treeService.treeDragEnd = this.treeDragEnd;
    }
}
