import { Component, ElementRef, HostBinding, Renderer2 } from '@angular/core';
import { TreeViewNodeComponent } from '..';
import { TreeViewService } from '../../../directives';

@Component({
    selector: 'app-tree-view-preview',
    templateUrl: './tree-view-preview.component.html',
    styleUrls: ['./tree-view-preview.component.scss'],
})
export class TreeViewPreviewComponent<T> {
    //private members
    @HostBinding('style.display') display$ = 'none';
    draggingElement$: HTMLElement | undefined;
    dragPreviewOffsetX$: number = 0;
    dragPreviewOffsetY$: number = 20;

    constructor(public elementRef: ElementRef<HTMLElement>, private renderer: Renderer2, treeService: TreeViewService<T>) {
        treeService.previewComponent = this;
    }

    attachElement = (e: MouseEvent, node: TreeViewNodeComponent<T>) => {

        this.display$ = 'block';
        this.draggingElement$ = <HTMLElement>node.elementRef.nativeElement.cloneNode(true);
        this.renderer.appendChild(this.elementRef.nativeElement, this.draggingElement$);
        this.setPreviewStyles$(e, node);
    };

    setPreviewStyles$ = (e: MouseEvent, node: TreeViewNodeComponent<T>) => {
        this.renderer.setStyle(this.draggingElement$, 'height', `${node.box?.height}px`);
        this.renderer.setStyle(this.draggingElement$, 'width', `${node.box?.width}px`);
        this.renderer.setStyle(this.draggingElement$, 'position', 'fixed');
        this.renderer.setStyle(this.draggingElement$, 'top', '0');
        this.renderer.setStyle(this.draggingElement$, 'left', '0');
        this.renderer.setStyle(this.draggingElement$, 'z-index', '999');
        this.renderer.setStyle(
            this.draggingElement$,
            'transform',
            `translate3d(${e.clientX + this.dragPreviewOffsetX$}px, ${e.clientY + this.dragPreviewOffsetY$}px, 0px)`
        );
    };

    moveElement = (e: MouseEvent) => {
        this.renderer.setStyle(
            this.draggingElement$,
            'transform',
            `translate3d(${e.clientX + this.dragPreviewOffsetX$}px, ${e.clientY + this.dragPreviewOffsetY$}px, 0px)`
        );
    };

    removeElement = () => {
        this.display$ = 'none';
        this.renderer.removeChild(this.elementRef.nativeElement, this.draggingElement$);
        this.draggingElement$ = undefined;
    };
}
