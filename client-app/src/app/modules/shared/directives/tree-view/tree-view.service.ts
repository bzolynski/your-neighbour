import { Injectable, OnDestroy, Renderer2 } from '@angular/core';
import { fromEvent, Observable, of, Subject } from 'rxjs';
import {
    delay,
    distinctUntilChanged,
    mergeMap,
    pairwise,
    startWith,
    takeUntil,
} from 'rxjs/operators';
import { ITree } from 'src/app/modules/core/types';
import { TreeViewRootDirective, TreeViewRootGroupDirective } from '.';
import { TreeViewNodeComponent } from '../../components';
import { TreeViewNodeContainerComponent } from '../../components/tree-view/tree-view-node-container/tree-view-node-container.component';
import { TreeViewUnassignedNodeContainerComponent } from '../../components/tree-view/tree-view-unassigned-node-container/tree-view-unassigned-node-container.component';

export type DropLocation = 'none' | 'above' | 'inside' | 'bellow';
export type CursorStyle = 'auto' | 'move' | 'not-allowed';

@Injectable()
export class TreeViewService<T> implements OnDestroy {
    // public properties
    dragDropAllowed: boolean = false;
    rootContainer: TreeViewRootGroupDirective<T> | undefined;
    roots: Array<TreeViewRootDirective<T>> = new Array<TreeViewRootDirective<T>>();
    nodes: Array<TreeViewNodeComponent<T>> = new Array<TreeViewNodeComponent<T>>();
    unassignedContainer: TreeViewUnassignedNodeContainerComponent<T> | undefined;
    treeDragEnd: Subject<{ draggedItem: ITree<T>; draggedOverItem: ITree<T> | null }> | undefined;

    /* */
    treeNodeComponentsChanged: Subject<TreeViewNodeComponent<T>> = new Subject();
    mouseup$!: Observable<MouseEvent>;

    /* */
    // private members
    dragPreviewOffsetX$: number = 0;
    dragPreviewOffsetY$: number = 20;
    setDraggingOverComponent$: Subject<TreeViewNodeComponent<T> | undefined> = new Subject<
        TreeViewNodeComponent<T> | undefined
    >();
    draggingOverComponent$: TreeViewNodeComponent<T> | undefined;
    isDragging$: boolean = false;
    draggingComponent$: TreeViewNodeComponent<T> | undefined;
    draggingPreview$: HTMLElement | undefined;
    docMouseMoveListener$: undefined | (() => void);
    docMouseUpListener$: undefined | (() => void);
    destroy$: Subject<boolean> = new Subject();

    // constructor
    constructor(private renderer: Renderer2) {
        this.mouseup$ = fromEvent<MouseEvent>(document.body, 'mouseup').pipe(
            takeUntil(this.destroy$)
        );

        this.setDraggingOverComponent$
            .pipe(
                distinctUntilChanged(),
                startWith(undefined),
                pairwise(),
                takeUntil(this.destroy$)
            )
            .subscribe(([previous, current]) => {
                if (previous) {
                    this.stylePositionLines(previous, 'none');
                }
                this.draggingOverComponent$ = current;
            });
        for (const x of this.nodes) {
            x.mousedown$.pipe(
                mergeMap((z) => {
                    console.log('W ŚRODKU JEBANEGO SERVICE');
                    return of(z).pipe(delay(250), takeUntil(this.destroy$));
                })
            );
        }
    }

    dragStart = (e: MouseEvent, node: TreeViewNodeComponent<T>) => {
        if (this.dragDropAllowed) {
            this.isDragging$ = true;
            this.createDraggingElement(e, node);
            this.docMouseMoveListener$ = this.renderer.listen(
                document,
                'mousemove',
                this.dragContinue
            );
            this.docMouseUpListener$ = this.renderer.listen(document, 'mouseup', this.dragEnd);
        }
    };

    createDraggingElement = (e: MouseEvent, node: TreeViewNodeComponent<T>) => {
        this.draggingComponent$ = node;
        const element = node.elementRef.nativeElement;
        this.draggingPreview$ = <HTMLElement>element.cloneNode(true);
        this.setPreviewStyles(e, node);

        if (this.rootContainer) {
            this.renderer.appendChild(
                this.rootContainer.elementRef.nativeElement,
                this.draggingPreview$
            );
        }
    };

    setPreviewStyles = (e: MouseEvent, node: TreeViewNodeComponent<T>) => {
        this.renderer.setStyle(this.draggingPreview$, 'height', `${node.box?.height}px`);
        this.renderer.setStyle(this.draggingPreview$, 'width', `${node.box?.width}px`);
        this.renderer.setStyle(this.draggingPreview$, 'position', 'fixed');
        this.renderer.setStyle(this.draggingPreview$, 'top', '0');
        this.renderer.setStyle(this.draggingPreview$, 'left', '0');
        this.renderer.setStyle(this.draggingPreview$, 'z-index', '999');
        this.renderer.setStyle(
            this.draggingPreview$,
            'transform',
            `translate3d(${e.clientX + this.dragPreviewOffsetX$}px, ${
                e.clientY + this.dragPreviewOffsetY$
            }px, 0px)`
        );
    };

    // document mousemove event
    dragContinue = (e: MouseEvent) => {
        this.renderer.setStyle(
            this.draggingPreview$,
            'transform',
            `translate3d(${e.clientX + this.dragPreviewOffsetX$}px, ${
                e.clientY + this.dragPreviewOffsetY$
            }px, 0px)`
        );
    };

    // styling drop indicators
    // triggered in TreeViewRootGroupDirective on mousemove
    checkDragOver = (e: MouseEvent) => {
        const component = this.nodes.find((x) => {
            if (x.box) return this.isCursorInBox(x.box, e);
            return false;
        });

        if (this.draggingComponent$ == component) return;
        if (component?.parentContainer == this.unassignedContainer) return;
        if (
            this.draggingComponent$?.elementRef.nativeElement.contains(
                component?.elementRef.nativeElement ?? null
            )
        )
            return;
        this.setDraggingOverComponent$.next(component);

        if (this.draggingOverComponent$?.box) {
            const box = this.draggingOverComponent$.box;
            const height = box.height;
            const quater = height / 3;
            let dropLocation: DropLocation = 'none';
            if (e.y <= box.top + quater && !this.draggingOverComponent$.node.isRoot) {
                dropLocation = 'above';
            } else if (e.y > box.top + quater && e.y < box.bottom - quater) {
                dropLocation = 'inside';
            } else if (e.y >= box.bottom - quater && !this.draggingOverComponent$.node.isRoot) {
                dropLocation = 'bellow';
            }
            this.stylePositionLines(this.draggingOverComponent$, dropLocation);
        }
    };

    private stylePositionLines = (
        component: TreeViewNodeComponent<T> | undefined,
        dropLocation: DropLocation
    ) => {
        if (component) component.dropLocationChanged.next(dropLocation);
    };

    // document mouseup event
    dragEnd = (e: MouseEvent) => {
        console.log(this.unassignedContainer?.box);
        //temp move to unassigned container
        if (this.unassignedContainer && this.isCursorInBox(this.unassignedContainer.box, e)) {
            if (!this.draggingComponent$) return;
            const x = this.draggingComponent$.node.flatten();
            console.log(x);

            this.unassignedContainer.container.insert(
                this.draggingComponent$.componentRef.hostView
            );
            if (this.treeDragEnd)
                this.treeDragEnd.next({
                    draggedItem: this.draggingComponent$.node,
                    draggedOverItem: null,
                });
        } else this.moveDraggedItem();
        this.isDragging$ = false;
        this.stylePositionLines(this.draggingOverComponent$, 'none');
        if (this.docMouseMoveListener$) this.docMouseMoveListener$();
        if (this.docMouseUpListener$) this.docMouseUpListener$();
        this.renderer.removeChild(this.draggingPreview$?.parentElement, this.draggingPreview$);
    };

    isCursorInBox = (box: DOMRect, e: MouseEvent) => {
        const xBool = box.left < e.x && box.right > e.x;
        const yBool = box.top < e.y && box.bottom > e.y;
        return xBool && yBool;
    };

    moveDraggedItem = () => {
        if (
            this.draggingComponent$ != this.draggingOverComponent$ &&
            this.draggingComponent$ &&
            this.draggingOverComponent$
        ) {
            const dropLocation: DropLocation = this.draggingOverComponent$?.dropLocation;
            if (
                (dropLocation == 'above' || dropLocation == 'bellow') &&
                this.draggingOverComponent$.node.isRoot
            )
                return;
            let index: number | undefined;
            let parentContainer!: TreeViewNodeContainerComponent<T>;
            switch (dropLocation) {
                case 'above': {
                    parentContainer = this.draggingOverComponent$.parentContainer;
                    const selfIndex = parentContainer.viewContainerRef.indexOf(
                        this.draggingComponent$.componentRef.hostView
                    );
                    index = parentContainer.viewContainerRef.indexOf(
                        this.draggingOverComponent$.componentRef.hostView
                    );
                    if (selfIndex !== -1 && selfIndex + 1 === index) index = selfIndex;
                    break;
                }
                case 'inside': {
                    parentContainer = this.draggingOverComponent$.childContainer;
                    break;
                }
                case 'bellow': {
                    parentContainer = this.draggingOverComponent$.parentContainer;
                    index = parentContainer.viewContainerRef.indexOf(
                        this.draggingOverComponent$.componentRef.hostView
                    );
                    const selfIndex = parentContainer.viewContainerRef.indexOf(
                        this.draggingComponent$.componentRef.hostView
                    );
                    if (selfIndex > index || selfIndex === -1) index += 1;
                    break;
                }
                default:
                    return;
            }
            parentContainer.viewContainerRef.insert(
                this.draggingComponent$.componentRef.hostView,
                index
            );
            this.draggingComponent$.parentContainer = parentContainer;
            if (this.treeDragEnd)
                this.treeDragEnd.next({
                    draggedItem: this.draggingComponent$.node,
                    draggedOverItem: this.draggingOverComponent$.node,
                });
        }
    };

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}
