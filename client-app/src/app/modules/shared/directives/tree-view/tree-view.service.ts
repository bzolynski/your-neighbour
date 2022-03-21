import { Injectable, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';
import { distinctUntilChanged, pairwise, startWith } from 'rxjs/operators';
import { TreeViewNodeComponent } from '../../components/tree-view/tree-view-node/tree-view-node.component';
import { TreeViewNodeContainerDirective } from './tree-view-node-container.directive';
import { TreeViewRootGroupDirective } from './tree-view-root-group.directive';
import { TreeViewRootDirective } from './tree-view-root.directive';

export type DropLocation = 'none' | 'above' | 'inside' | 'bellow';
export type CursorStyle = 'auto' | 'move' | 'not-allowed';

@Injectable()
export class TreeViewService<T> {
    // public properties

    rootContainer: TreeViewRootGroupDirective<T> | undefined;
    roots: Array<TreeViewRootDirective<T>> = new Array<TreeViewRootDirective<T>>();
    nodes: Array<TreeViewNodeComponent<T>> = new Array<TreeViewNodeComponent<T>>();
    nodeContainers: Array<TreeViewNodeContainerDirective<T>> = new Array<
        TreeViewNodeContainerDirective<T>
    >();

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

    // constructor
    constructor(private renderer: Renderer2) {
        this.setDraggingOverComponent$
            .pipe(distinctUntilChanged(), startWith(undefined), pairwise())
            .subscribe(([previous, current]) => {
                if (previous) {
                    this.stylePositionLines(previous, 'none');
                }
                this.draggingOverComponent$ = current;
            });
    }

    dragStart = (e: MouseEvent, node: TreeViewNodeComponent<T>) => {
        this.isDragging$ = true;
        this.createDraggingElement(e, node);
        this.docMouseMoveListener$ = this.renderer.listen(document, 'mousemove', this.dragContinue);
        this.docMouseUpListener$ = this.renderer.listen(document, 'mouseup', this.dragEnd);
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

    // triggered in TreeViewRootGroupDirective on mousemove
    checkDragOver = (e: MouseEvent) => {
        const component = this.nodes.find((x) => {
            if (x.box) {
                const xBool = x.box.left < e.x && x.box.right > e.x;
                const yBool = x.box.top < e.y && x.box.bottom > e.y;
                return yBool && xBool;
            }
            return false;
        });

        if (this.draggingComponent$ == component) return;
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
        this.moveDraggedItem();
        this.isDragging$ = false;
        this.stylePositionLines(this.draggingOverComponent$, 'none');
        if (this.docMouseMoveListener$) this.docMouseMoveListener$();
        if (this.docMouseUpListener$) this.docMouseUpListener$();
        this.renderer.removeChild(this.draggingPreview$?.parentElement, this.draggingPreview$);
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
            let parentContainer!: TreeViewNodeContainerDirective<T>;
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
            this.draggingComponent$.node.changeParent(this.draggingOverComponent$.node);
        }
    };
}
