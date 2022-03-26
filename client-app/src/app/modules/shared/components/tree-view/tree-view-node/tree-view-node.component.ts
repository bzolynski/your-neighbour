import { Component, ComponentRef, ElementRef, Input, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { fromEvent, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ITree } from 'src/app/modules/core/types';
import { DropLocation, TreeViewService } from '../../../directives';
import { TreeViewNodeContainerComponent } from '../tree-view-node-container/tree-view-node-container.component';

@Component({
    selector: 'app-tree-view-node',
    templateUrl: './tree-view-node.component.html',
    styleUrls: ['./tree-view-node.component.scss'],
})
export class TreeViewNodeComponent<T> implements OnInit, OnDestroy {
    // public properties
    @Input() node!: ITree<T>;
    @Input() template!: TemplateRef<any>;
    @ViewChild('draggableContent', { static: true }) draggableContentRef!: ElementRef<HTMLElement>;
    @ViewChild(TreeViewNodeContainerComponent, { static: true })
    childContainer!: TreeViewNodeContainerComponent<T>;
    parentContainer!: TreeViewNodeContainerComponent<T>;
    componentRef!: ComponentRef<TreeViewNodeComponent<T>>;
    dropLocation: DropLocation = 'none';
    isExpanded: boolean = true;
    get box(): DOMRect {
        return this.draggableContentRef.nativeElement.getBoundingClientRect();
    }
    mousedown!: Observable<MouseEvent>;
    changeParent: Subject<TreeViewNodeContainerComponent<T>> = new Subject();
    // private members
    destroy$: Subject<boolean> = new Subject<boolean>();

    // constructor
    constructor(private treeService: TreeViewService<T>, public elementRef: ElementRef<HTMLElement>) {
        this.changeParent.pipe(takeUntil(this.destroy$)).subscribe((container) => {
            //this.parentContainer.nodes.splice(this.parentContainer.nodes.indexOf(this), 1);
            this.parentContainer.removeNode(this);
            this.parentContainer = container;
        });
    }

    ngOnInit(): void {
        this.mousedown = fromEvent<MouseEvent>(this.draggableContentRef.nativeElement, 'mousedown').pipe(
            takeUntil(this.destroy$)
        );
        this.treeService.treeNodeComponentsChanged.next(this);
        if (this.childContainer) this.renderChild();
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

    renderChild = (): void => {
        for (const child of this.node.children) {
            this.childContainer.renderNode(child, this.template);
        }
    };

    isCursorOver = (e: MouseEvent): boolean => {
        const xBool = this.box.left < e.x && this.box.right > e.x;
        const yBool = this.box.top < e.y && this.box.bottom > e.y;
        return xBool && yBool;
    };

    setDropLocationLine = (e: MouseEvent): void => {
        const height = this.box.height;
        const quater = height / 3;
        let dropLocation: DropLocation = 'none';
        if (e.y <= this.box.top + quater && !this.node.isRoot) {
            dropLocation = 'above';
        } else if (e.y > this.box.top + quater && e.y < this.box.bottom - quater) {
            dropLocation = 'inside';
        } else if (e.y >= this.box.bottom - quater && !this.node.isRoot) {
            dropLocation = 'bellow';
        }
        this.dropLocation = dropLocation;
    };

    removeDropLocation = (): void => {
        this.dropLocation = 'none';
    };

    flatten = (): Array<TreeViewNodeComponent<T>> => {
        const arr = new Array<TreeViewNodeComponent<T>>(this);
        return arr.concat(...this.childContainer.nodes.map((child) => child.flatten()));
    };
}
