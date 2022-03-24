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
    dropLocationChanged: Subject<DropLocation> = new Subject();
    get box(): DOMRect | undefined {
        return this.elementRef.nativeElement.querySelector('.main-node-content')?.getBoundingClientRect();
    }

    // private members
    mousedown$!: Observable<MouseEvent>;
    mouseup$!: Observable<MouseEvent>;
    destroy$: Subject<boolean> = new Subject<boolean>();

    // constructor
    constructor(private treeService: TreeViewService<T>, public elementRef: ElementRef<HTMLElement>) {
        this.dropLocationChanged.subscribe((x) => {
            this.dropLocation = x;
        });
    }

    ngOnInit(): void {
        this.mousedown$ = fromEvent<MouseEvent>(this.draggableContentRef.nativeElement, 'mousedown').pipe(
            takeUntil(this.destroy$)
        );
        this.treeService.treeNodeComponentsChanged.next(this);
        if (this.childContainer) this.renderChild();
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

    renderChild = () => {
        for (const child of this.node.children) {
            const compRef = this.childContainer.viewContainerRef.createComponent(
                TreeViewNodeComponent
            ) as unknown as ComponentRef<TreeViewNodeComponent<T>>;
            compRef.instance.parentContainer = this.childContainer;
            compRef.instance.node = child;
            compRef.instance.template = this.template;
            compRef.instance.componentRef = compRef;
        }
    };
}
