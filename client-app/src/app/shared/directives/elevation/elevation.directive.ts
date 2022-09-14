import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
    selector: '[appElevation]',
})
export class ElevationDirective {
    @Input('appElevation') set level(value: number) {
        this.renderer.addClass(this.elementRef.nativeElement, `shadow-${value}`);
    }
    constructor(private renderer: Renderer2, private elementRef: ElementRef<HTMLElement>) {}
}
