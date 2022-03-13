import {
    Directive,
    ElementRef,
    Renderer2,
    ViewContainerRef,
} from '@angular/core';
import { DragDropRootContainerDirective } from './drag-drop-root-container.directive';

@Directive({
    selector: '[dragDropContainer]',
})
export class DragDropContainerDirective {
    constructor(
        public viewContainerRef: ViewContainerRef,
        public elementRef: ElementRef<HTMLElement>,
        private renderer: Renderer2,
        private dragDropRootContainer: DragDropRootContainerDirective
    ) {
        console.log(elementRef);
        console.log(viewContainerRef);
    }
}
