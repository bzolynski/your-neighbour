import {
    AfterViewInit,
    Directive,
    ElementRef,
    HostListener,
    Renderer2,
} from '@angular/core';

@Directive({
    selector: '[appDragItem]',
})
export class DragItemDirective implements AfterViewInit {
    constructor(
        private elementRef: ElementRef<HTMLElement>,
        private renderer: Renderer2
    ) {
        console.log(elementRef.nativeElement);
    }
    ngAfterViewInit(): void {
        this.renderer.setAttribute(
            this.elementRef.nativeElement,
            'draggable',
            'true'
        );
    }
    @HostListener('dragstart', ['$event'])
    dragStart = (e: DragEvent) => {
        e.stopPropagation();
        this.renderer.addClass(this.elementRef.nativeElement, 'dragging');
    };

    @HostListener('dragend', ['$event'])
    dragEnd = (e: DragEvent) => {
        e.stopPropagation();
        this.renderer.removeClass(this.elementRef.nativeElement, 'dragging');
    };
}
