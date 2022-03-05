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
    public elementRef!: ElementRef<HTMLElement>;
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
        this.setHeight(height);
        console.log(this.elementRef);
    };

    private setHeight = (height: number) => {
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
        const placeholderBox =
            this.elementRef.nativeElement.getBoundingClientRect();
        console.log(placeholderBox);
        console.log(box);
        const x = box.x - placeholderBox.x;
        const y = box.y - placeholderBox.y;
        console.log(x, y);

        this.renderer.setStyle(
            this.elementRef.nativeElement,
            'transform',
            `translate3d(${x}px, ${y}px, 0px)`
        );
    };

    remove = () => {
        this.viewContainerRef.clear();
    };
}
