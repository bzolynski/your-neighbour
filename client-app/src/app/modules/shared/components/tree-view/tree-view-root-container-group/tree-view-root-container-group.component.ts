import { Component, ElementRef, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { ITree } from 'src/app/modules/core/types';
import { DropLocation, TreeViewService } from '../../../directives';

@Component({
    selector: 'app-tree-view-root-container-group',
    templateUrl: './tree-view-root-container-group.component.html',
    styleUrls: ['./tree-view-root-container-group.component.scss'],
    providers: [TreeViewService],
})
export class TreeViewRootContainerGroupComponent<T> implements OnInit {
    @Input() dragDropAllowed: boolean = false;
    @Output() treeDragEnd: Subject<{ draggedItem: ITree<T>; draggedOverItem: ITree<T> | undefined; dropLocation: DropLocation }> =
        new Subject();

    // private members
    constructor(private treeService: TreeViewService<T>, public elementRef: ElementRef<HTMLElement>) {
        this.treeService.rootGroupContainer = this;
    }

    ngOnInit(): void {
        this.treeService.dragDropAllowed = this.dragDropAllowed;
        this.treeService.treeDragEnd = this.treeDragEnd;
    }
}
