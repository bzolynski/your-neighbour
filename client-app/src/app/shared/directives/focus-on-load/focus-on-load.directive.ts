import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[appFocusOnLoad]',
})
export class FocusOnLoadDirective implements AfterViewInit {
    constructor(private elementRef: ElementRef<HTMLElement>) {}

    ngAfterViewInit() {
        this.elementRef.nativeElement.focus();
    }
}
