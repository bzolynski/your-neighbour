import { Injectable, OnDestroy, Renderer2 } from '@angular/core';
import { forkJoin, fromEvent, Observable, of, Subject } from 'rxjs';
import { delay, distinctUntilChanged, mergeMap, pairwise, startWith, takeUntil, takeWhile } from 'rxjs/operators';
import { ITree } from 'src/app/modules/core/types';
import {
    TreeViewNodeComponent,
    TreeViewNodeContainerComponent,
    TreeViewPreviewComponent,
    TreeViewRootContainerComponent,
    TreeViewRootContainerGroupComponent,
    TreeViewUnassignedNodeContainerComponent,
} from '../components';
import { DropLocation } from '../models';
@Injectable()
export class TreeViewService<T> implements OnDestroy {
    // public properties
    dragDropAllowed: boolean = false;
    rootGroupContainer: TreeViewRootContainerGroupComponent<T> | undefined;
    rootContainers: Array<TreeViewRootContainerComponent<T>> = new Array<TreeViewRootContainerComponent<T>>();
    nodeComponents: Array<TreeViewNodeComponent<T>> = new Array<TreeViewNodeComponent<T>>();
    unassignedContainer: TreeViewUnassignedNodeContainerComponent<T> | undefined;
    previewComponent!: TreeViewPreviewComponent<T>;

    treeDragEnd:
        | Subject<{ draggedItem: ITree<T>; draggedOverItem: ITree<T> | undefined; dropLocation: DropLocation }>
        | undefined;
    treeNodeComponentsChanged: Subject<TreeViewNodeComponent<T>> = new Subject();

    // private members
    setDraggingOverComponent$: Subject<TreeViewNodeComponent<T> | undefined> = new Subject<
        TreeViewNodeComponent<T> | undefined
    >();
    draggingOverComponent$: TreeViewNodeComponent<T> | undefined;
    isDragging$: boolean = false;
    draggingComponent$: TreeViewNodeComponent<T> | undefined;
    docMouseMove$!: Observable<MouseEvent>;
    docMouseUp$!: Observable<MouseEvent>;
    destroy$: Subject<boolean> = new Subject();

    // constructor
    constructor(private renderer: Renderer2) {
        this.docMouseMove$ = fromEvent<MouseEvent>(document.body, 'mousemove').pipe(takeUntil(this.destroy$ || this.docMouseUp$));

        // assign mouseup event for document
        this.docMouseUp$ = fromEvent<MouseEvent>(document.body, 'mouseup').pipe(
            takeUntil(this.destroy$),
            takeWhile(() => this.dragDropAllowed)
        );

        // add node components to array and subscribe to mouseDown events
        this.treeNodeComponentsChanged
            .pipe(
                takeWhile(() => this.dragDropAllowed),
                takeUntil(this.destroy$)
            )
            .subscribe((component) => {
                this.nodeComponents.push(component);
                const canBeGrabbed = !component.node.isRoot || component.parentContainer == this.unassignedContainer;
                if (canBeGrabbed) this.renderer.setStyle(component.draggableContentRef.nativeElement, 'cursor', 'grab');
                component.mousedown
                    .pipe(
                        takeWhile(() => {
                            if (!canBeGrabbed) return false;
                            return this.dragDropAllowed;
                        }),
                        mergeMap((event) => {
                            event.stopPropagation();
                            return forkJoin([of(event).pipe(delay(250), takeUntil(this.docMouseUp$)), of(component)]);
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
                if (previous) previous.removeDropLocation();

                this.draggingOverComponent$ = current;
            });
    }

    dragStart = (e: MouseEvent, node: TreeViewNodeComponent<T>): void => {
        this.isDragging$ = true;
        this.renderer.addClass(document.body, 'inheritCursors');
        this.renderer.setStyle(document.body, 'cursor', 'grabbing');
        this.previewComponent.attachElement(e, node);
        this.draggingComponent$ = node;

        this.docMouseMove$.pipe(takeWhile(() => this.dragDropAllowed && this.isDragging$)).subscribe((e) => {
            this.dragContinue(e);
            this.checkDragOver(e);
        });

        this.docMouseUp$.pipe(takeWhile(() => this.isDragging$)).subscribe((e) => {
            this.dragEnd(e);
        });
    };

    // document mousemove event
    dragContinue = (e: MouseEvent): void => {
        this.previewComponent.moveElement(e);
    };

    // styling drop indicators
    // triggered in TreeViewRootGroupDirective on mousemove
    checkDragOver = (e: MouseEvent): void => {
        if (!this.rootContainers.some((x) => x.isCursorOver(e))) {
            this.renderer.setStyle(document.body, 'cursor', 'not-allowed');
            return;
        }
        this.renderer.setStyle(document.body, 'cursor', 'grabbing');

        const component = this.nodeComponents.find((x) => x.isCursorOver(e));

        if (this.draggingComponent$ == component) return;
        if (component?.parentContainer == this.unassignedContainer) return;
        if (this.draggingComponent$?.elementRef.nativeElement.contains(component?.elementRef.nativeElement ?? null)) return;
        this.setDraggingOverComponent$.next(component);
        component?.setDropLocationLine(e);
    };

    // document mouseup event
    dragEnd = (e: MouseEvent): void => {
        this.renderer.removeStyle(document.body, 'cursor');
        this.renderer.removeClass(document.body, 'inheritCursors');
        //temp move to unassigned container
        if (this.unassignedContainer && this.unassignedContainer.isCursorOver(e)) {
            if (!this.draggingComponent$) return;
            const z = this.draggingComponent$.flatten();

            for (const node of z) {
                this.unassignedContainer.insertNode(node);
                this.tryTriggerOnDragEndEvent(node.node, undefined, 'none');
            }
        } else this.moveDraggedItem();
        /*** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** ***/
        this.isDragging$ = false;
        this.draggingOverComponent$?.removeDropLocation();
        this.previewComponent.removeElement();
    };

    moveDraggedItem = (): void => {
        if (this.draggingComponent$ != this.draggingOverComponent$ && this.draggingComponent$ && this.draggingOverComponent$) {
            const dropLocation: DropLocation = this.draggingOverComponent$?.dropLocation;
            if ((dropLocation == 'above' || dropLocation == 'bellow') && this.draggingOverComponent$.node.isRoot) return;
            let index: number | undefined;
            let parentContainer!: TreeViewNodeContainerComponent<T>;
            switch (dropLocation) {
                case 'above': {
                    parentContainer = this.draggingOverComponent$.parentContainer;
                    const selfIndex = parentContainer.positionOf(this.draggingComponent$);
                    index = parentContainer.positionOf(this.draggingOverComponent$);
                    if (selfIndex !== -1 && selfIndex + 1 === index) index = selfIndex;
                    break;
                }
                case 'inside': {
                    parentContainer = this.draggingOverComponent$.childContainer;
                    break;
                }
                case 'bellow': {
                    parentContainer = this.draggingOverComponent$.parentContainer;
                    index = parentContainer.positionOf(this.draggingOverComponent$);
                    const selfIndex = parentContainer.positionOf(this.draggingComponent$);
                    if (selfIndex > index || selfIndex === -1) index += 1;
                    break;
                }
                default:
                    return;
            }
            parentContainer.insertNode(this.draggingComponent$, index);
            this.tryTriggerOnDragEndEvent(this.draggingComponent$.node, this.draggingOverComponent$.node, dropLocation);
        }
    };

    tryTriggerOnDragEndEvent = (dragged: ITree<T>, draggedOver: ITree<T> | undefined, dropLocation: DropLocation) => {
        if (this.treeDragEnd)
            this.treeDragEnd.next({
                draggedItem: dragged,
                draggedOverItem: draggedOver,
                dropLocation: dropLocation,
            });
    };

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}
