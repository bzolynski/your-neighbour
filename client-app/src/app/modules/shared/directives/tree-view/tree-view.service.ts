import { Injectable, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';
import { distinctUntilChanged, pairwise, startWith } from 'rxjs/operators';
import { TreeViewNodeComponent } from '../../components/tree-view/tree-view-node/tree-view-node.component';
import { TreeViewNodeContainerDirective } from './tree-view-node-container.directive';
import { TreeViewRootGroupDirective } from './tree-view-root-group.directive';
import { TreeViewRootDirective } from './tree-view-root.directive';

@Injectable()
export class TreeViewService<T> {
    // public properties

    rootContainer: TreeViewRootGroupDirective<T> | undefined;
    roots: Array<TreeViewRootDirective<T>> = new Array<
        TreeViewRootDirective<T>
    >();
    nodes: Array<TreeViewNodeComponent<T>> = new Array<
        TreeViewNodeComponent<T>
    >();
    nodeContainers: Array<TreeViewNodeContainerDirective<T>> = new Array<
        TreeViewNodeContainerDirective<T>
    >();

    // private members
    setDraggingOverComponent$: Subject<TreeViewNodeComponent<T> | undefined> =
        new Subject<TreeViewNodeComponent<T> | undefined>();
    draggingOverComponent$: TreeViewNodeComponent<T> | undefined;
    dragging$: boolean = false;
    draggingPreview$: HTMLElement | undefined;
    docMouseMoveListener$: undefined | (() => void);
    docMouseUpListener$: undefined | (() => void);

    // constructor
    constructor(private renderer: Renderer2) {
        this.setDraggingOverComponent$
            .pipe(distinctUntilChanged(), startWith(undefined), pairwise())
            .subscribe(([previous, current]) => {
                if (previous) {
                    console.log('PREV');

                    this.stylePositionLines(previous, 'none');
                }
                this.draggingOverComponent$ = current;
            });
    }

    dragStart = (e: MouseEvent, node: TreeViewNodeComponent<T>) => {
        this.dragging$ = true;
        this.createDraggingElement(e, node);
        this.docMouseMoveListener$ = this.renderer.listen(
            document,
            'mousemove',
            this.dragContinue
        );
        this.docMouseUpListener$ = this.renderer.listen(
            document,
            'mouseup',
            this.dragEnd
        );
    };

    createDraggingElement = (e: MouseEvent, node: TreeViewNodeComponent<T>) => {
        const element = node.elementRef.nativeElement;
        this.draggingPreview$ = <HTMLElement>element.cloneNode(true);
        this.setPreviewStyles(node);

        if (this.rootContainer) {
            this.renderer.appendChild(
                this.rootContainer.elementRef.nativeElement,
                this.draggingPreview$
            );
        }
    };

    setPreviewStyles = (node: TreeViewNodeComponent<T>) => {
        this.renderer.setStyle(
            this.draggingPreview$,
            'height',
            `${node.box?.height}px`
        );
        this.renderer.setStyle(
            this.draggingPreview$,
            'width',
            `${node.box?.width}px`
        );
        this.renderer.setStyle(this.draggingPreview$, 'position', 'fixed');
        this.renderer.setStyle(this.draggingPreview$, 'top', '0');
        this.renderer.setStyle(this.draggingPreview$, 'left', '0');
        this.renderer.setStyle(this.draggingPreview$, 'z-index', '999');
        this.renderer.setStyle(
            this.draggingPreview$,
            'transform',
            `translate3d(${node.box?.x}px, ${node.box?.y}px, 0px)`
        );
    };

    dragContinue = (e: MouseEvent) => {
        this.renderer.setStyle(
            this.draggingPreview$,
            'transform',
            `translate3d(${e.clientX}px, ${e.clientY}px, 0px)`
        );
    };

    checkDragOver = (e: MouseEvent) => {
        const component2 = this.nodes.find((x) => {
            if (x.box) {
                const xBool = x.box.left < e.x && x.box.right > e.x;
                const yBool = x.box.top < e.y && x.box.bottom > e.y;
                return yBool && xBool;
            }
            return false;
        });

        this.setDraggingOverComponent$.next(component2);

        if (this.draggingOverComponent$?.box) {
            const box = this.draggingOverComponent$.box;
            const height = box.height;
            const quater = height / 4;
            let position: NodeMouseLocation = 'none';
            if (e.y < box.top + quater) {
                this.stylePositionLines(this.draggingOverComponent$, 'above');
                position = 'above';
            } else if (e.y > box.top + quater && e.y < box.bottom - quater) {
                this.stylePositionLines(this.draggingOverComponent$, 'inside');
                position = 'inside';
            } else if (e.y > box.bottom - quater) {
                this.stylePositionLines(this.draggingOverComponent$, 'bellow');
                position = 'bellow';
            } else this.stylePositionLines(this.draggingOverComponent$, 'none');
            this.draggingOverComponent$.mouseLocationChanged.next(position);
        }
    };

    private stylePositionLines = (
        component: TreeViewNodeComponent<T> | undefined,
        style: NodeMouseLocation
    ) => {
        if (component) component.mouseLocationChanged.next(style);
    };

    dragEnd = (e: MouseEvent) => {
        this.stylePositionLines(this.draggingOverComponent$, 'none');
        this.dragging$ = false;
        if (this.docMouseMoveListener$) this.docMouseMoveListener$();
        if (this.docMouseUpListener$) this.docMouseUpListener$();
        this.renderer.removeChild(
            this.draggingPreview$?.parentElement,
            this.draggingPreview$
        );
    };
}

export type NodeMouseLocation = 'none' | 'above' | 'inside' | 'bellow';
