import { Injectable, OnDestroy, Renderer2 } from '@angular/core';
import { forkJoin, fromEvent, Observable, of, Subject } from 'rxjs';
import { delay, distinctUntilChanged, mergeMap, pairwise, startWith, takeUntil, takeWhile } from 'rxjs/operators';
import { ITree } from 'src/app/modules/core/types';
import {
    TreeViewNodeComponent,
    TreeViewNodeContainerComponent,
    TreeViewPreviewComponent,
    TreeViewRootContainerGroupComponent,
    TreeViewUnassignedNodeContainerComponent,
} from '../../components';
export type DropLocation = 'none' | 'above' | 'inside' | 'bellow';
export type CursorStyle = 'auto' | 'move' | 'not-allowed';

@Injectable()
export class TreeViewService<T> implements OnDestroy {
    // public properties
    dragDropAllowed: boolean = false;
    rootContainer: TreeViewRootContainerGroupComponent<T> | undefined;
    nodes: Array<TreeViewNodeComponent<T>> = new Array<TreeViewNodeComponent<T>>();
    unassignedContainer: TreeViewUnassignedNodeContainerComponent<T> | undefined;
    treeDragEnd: Subject<{ draggedItem: ITree<T>; draggedOverItem: ITree<T> | null }> | undefined;
    treePreviewComponent!: TreeViewPreviewComponent<T>;
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
    docMouseMoveListener$: undefined | (() => void);
    docMouseUpListener$: undefined | (() => void);
    destroy$: Subject<boolean> = new Subject();

    // constructor
    constructor(private renderer: Renderer2) {
        // assign mouseup event for document
        this.mouseup$ = fromEvent<MouseEvent>(document.body, 'mouseup').pipe(
            takeUntil(this.destroy$),
            takeWhile(() => this.dragDropAllowed)
        );
        this.mouseup$.subscribe(() => {
            this.renderer.removeStyle(document.body, 'cursor');
            this.renderer.removeClass(document.body, 'inheritCursors');
        });

        // add node components to array and subscribe to mouseDown events
        this.treeNodeComponentsChanged
            .pipe(
                takeUntil(this.destroy$),
                takeWhile(() => {
                    return this.dragDropAllowed;
                })
            )
            .subscribe((component) => {
                this.nodes.push(component);
                const canBeGrabbed = !component.node.isRoot || component.parentContainer == this.unassignedContainer;
                if (canBeGrabbed) this.renderer.setStyle(component.draggableContentRef.nativeElement, 'cursor', 'grab');
                component.mousedown$
                    .pipe(
                        takeWhile(() => {
                            if (!canBeGrabbed) return false;
                            return this.dragDropAllowed;
                        }),
                        mergeMap((event) => {
                            event.stopPropagation();
                            return forkJoin([of(event).pipe(delay(250), takeUntil(this.mouseup$)), of(component)]);
                        })
                    )
                    .subscribe((data) => {
                        this.dragStart(...data);
                    });
            });

        // set dragging over component
        this.setDraggingOverComponent$
            .pipe(
                distinctUntilChanged(),
                startWith(undefined),
                pairwise(),
                takeUntil(this.destroy$),
                takeWhile(() => this.dragDropAllowed)
            )
            .subscribe(([previous, current]) => {
                if (previous) {
                    this.stylePositionLines(previous, 'none');
                }
                this.draggingOverComponent$ = current;
            });
    }

    dragStart = (e: MouseEvent, node: TreeViewNodeComponent<T>) => {
        this.isDragging$ = true;
        this.renderer.addClass(document.body, 'inheritCursors');
        this.renderer.setStyle(document.body, 'cursor', 'grabbing');
        this.treePreviewComponent.attachElement(e, node);
        this.draggingComponent$ = node;

        this.docMouseMoveListener$ = this.renderer.listen(document, 'mousemove', this.dragContinue);
        this.docMouseUpListener$ = this.renderer.listen(document, 'mouseup', this.dragEnd);
    };

    // document mousemove event
    dragContinue = (e: MouseEvent) => {
        this.treePreviewComponent.moveElement(e);
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
        if (this.draggingComponent$?.elementRef.nativeElement.contains(component?.elementRef.nativeElement ?? null)) return;
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

    private stylePositionLines = (component: TreeViewNodeComponent<T> | undefined, dropLocation: DropLocation) => {
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

            this.unassignedContainer.container.insert(this.draggingComponent$.componentRef.hostView);
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

        this.treePreviewComponent.removeElement();
    };

    isCursorInBox = (box: DOMRect, e: MouseEvent) => {
        const xBool = box.left < e.x && box.right > e.x;
        const yBool = box.top < e.y && box.bottom > e.y;
        return xBool && yBool;
    };

    moveDraggedItem = () => {
        if (this.draggingComponent$ != this.draggingOverComponent$ && this.draggingComponent$ && this.draggingOverComponent$) {
            const dropLocation: DropLocation = this.draggingOverComponent$?.dropLocation;
            if ((dropLocation == 'above' || dropLocation == 'bellow') && this.draggingOverComponent$.node.isRoot) return;
            let index: number | undefined;
            let parentContainer!: TreeViewNodeContainerComponent<T>;
            switch (dropLocation) {
                case 'above': {
                    parentContainer = this.draggingOverComponent$.parentContainer;
                    const selfIndex = parentContainer.viewContainerRef.indexOf(this.draggingComponent$.componentRef.hostView);
                    index = parentContainer.viewContainerRef.indexOf(this.draggingOverComponent$.componentRef.hostView);
                    if (selfIndex !== -1 && selfIndex + 1 === index) index = selfIndex;
                    break;
                }
                case 'inside': {
                    parentContainer = this.draggingOverComponent$.childContainer;
                    break;
                }
                case 'bellow': {
                    parentContainer = this.draggingOverComponent$.parentContainer;
                    index = parentContainer.viewContainerRef.indexOf(this.draggingOverComponent$.componentRef.hostView);
                    const selfIndex = parentContainer.viewContainerRef.indexOf(this.draggingComponent$.componentRef.hostView);
                    if (selfIndex > index || selfIndex === -1) index += 1;
                    break;
                }
                default:
                    return;
            }
            parentContainer.viewContainerRef.insert(this.draggingComponent$.componentRef.hostView, index);
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
