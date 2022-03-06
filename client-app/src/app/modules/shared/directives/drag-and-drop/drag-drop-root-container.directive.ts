import { AfterViewInit, Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
    selector: '[dragDropRootContainer]',
})
export class DragDropRootContainerDirective implements AfterViewInit {
    constructor(
        private elementRef: ElementRef<HTMLElement>,
        private renderer: Renderer2
    ) {}
    ngAfterViewInit(): void {}
}
