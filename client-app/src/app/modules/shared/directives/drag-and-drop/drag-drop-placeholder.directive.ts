import {
    Directive,
    ElementRef,
    Renderer2,
    ViewContainerRef,
} from '@angular/core';
import { DragDropPlaceholderComponent } from '../../components/drag-and-drop/drag-drop-placeholder/drag-drop-placeholder.component';

@Directive({
    selector: '[dragDropPlaceholder]',
})
export class DragDropPlaceholderDirective {
    public elementRef: ElementRef<HTMLElement> | undefined;
    private initialPosition!: DOMRect;
    constructor(
        public viewContainerRef: ViewContainerRef,
        private renderer: Renderer2
    ) {}

    create = (height: number) => {
        this.viewContainerRef.clear();
        const componentRef =
            this.viewContainerRef.createComponent<DragDropPlaceholderComponent>(
                DragDropPlaceholderComponent
            );
        this.elementRef = componentRef.location;
        // może insertBefore??
        this.setStyles(height);
        this.initialPosition =
            this.elementRef.nativeElement.getBoundingClientRect();
    };

    private setStyles = (height: number) => {
        if (!this.elementRef) return;
        this.renderer.addClass(
            this.elementRef.nativeElement,
            'drag-drop-placeholder'
        );
        this.renderer.setStyle(
            this.elementRef.nativeElement,
            'height',
            `${height}px`
        );
    };

    move = (box: DOMRect) => {
        console.log();
        console.log(this.elementRef?.nativeElement);

        if (!this.elementRef) return;
        const x = box.x - this.initialPosition.x;
        const y = box.y - this.initialPosition.y;
        console.log(x, y);
        this.renderer.setStyle(
            this.elementRef.nativeElement,
            'transform',
            `translate3d(${x}px, ${y}px, 0px)`
        );
    };

    remove = () => {
        this.viewContainerRef.remove();
        this.elementRef = undefined;
    };
}
