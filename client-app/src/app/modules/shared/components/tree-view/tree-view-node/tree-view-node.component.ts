import {
    AfterViewInit,
    Component,
    ComponentRef,
    ElementRef,
    Input,
    OnDestroy,
    OnInit,
    Renderer2,
    TemplateRef,
    ViewChild,
} from '@angular/core';
import { fromEvent, Observable, of, Subject } from 'rxjs';
import { delay, mergeMap, takeUntil } from 'rxjs/operators';
import { ITree } from 'src/app/modules/core/types';
import { DropLocation, TreeViewService } from '../../../directives';
import { TreeViewNodeContainerComponent } from '../tree-view-node-container/tree-view-node-container.component';
import { TreeViewUnassignedNodeContainerComponent } from '../tree-view-unassigned-node-container/tree-view-unassigned-node-container.component';

@Component({
    selector: 'app-tree-view-node',
    templateUrl: './tree-view-node.component.html',
    styleUrls: ['./tree-view-node.component.scss'],
})
export class TreeViewNodeComponent<T> implements OnInit, AfterViewInit, OnDestroy {
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
    dragDropAllowed!: boolean;
    get box(): DOMRect | undefined {
        return this.elementRef.nativeElement
            .querySelector('.main-node-content')
            ?.getBoundingClientRect();
    }

    // private members
    mousedown$!: Observable<MouseEvent>;
    mouseup$!: Observable<MouseEvent>;
    destroy$: Subject<boolean> = new Subject<boolean>();

    // constructor
    constructor(
        private treeService: TreeViewService<T>,
        public elementRef: ElementRef<HTMLElement>,
        private renderer: Renderer2
    ) {
        treeService.nodes.push(this);
        this.dropLocationChanged.subscribe((x) => {
            this.dropLocation = x;
        });
    }

    ngOnInit(): void {
        this.dragDropAllowed =
            this.treeService.dragDropAllowed &&
            (!this.node.isRoot ||
                this.parentContainer instanceof TreeViewUnassignedNodeContainerComponent);
        this.mousedown$ = fromEvent<MouseEvent>(
            this.draggableContentRef.nativeElement,
            'mousedown'
        ).pipe(takeUntil(this.destroy$));
        this.mouseup$ = fromEvent<MouseEvent>(document.body, 'mouseup').pipe(
            takeUntil(this.destroy$)
        );
        if (this.childContainer) this.renderChild();
    }

    ngAfterViewInit(): void {
        if (this.dragDropAllowed) {
            this.mousedown$
                .pipe(
                    mergeMap((event) => {
                        event.stopPropagation();

                        return of(event).pipe(delay(250), takeUntil(this.mouseup$));
                    })
                )
                .subscribe((e) => {
                    this.renderer.addClass(document.body, 'inheritCursors');
                    this.renderer.setStyle(document.body, 'cursor', 'grabbing');
                    this.treeService.dragStart(e, this);
                });
            this.mouseup$.subscribe((e) => {
                this.renderer.removeStyle(document.body, 'cursor');
                this.renderer.removeClass(document.body, 'inheritCursors');
            });
        }
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
