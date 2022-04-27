import { Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';

@Directive({
    selector: '[appParentWidth]',
})
export class ParentWidthDirective implements OnInit, OnDestroy {
    @Input('appParentWidth') percentage: number = 100;
    constructor(private elementRef: ElementRef<HTMLElement>, private renderer: Renderer2) {}

    private resizeObserver = new ResizeObserver((entries) => {
        entries.forEach((entry) => {
            this.renderer.setStyle(
                this.elementRef.nativeElement,
                'width',
                `${(entry.contentRect.width * this.percentage) / 100}px`
            );
        });
    });
    ngOnInit(): void {
        const parent = this.elementRef.nativeElement.parentElement;
        console.log(parent);
        if (parent) this.resizeObserver.observe(parent);
        else this.renderer.setStyle(this.elementRef.nativeElement, 'width', `${100}%`);
    }
    ngOnDestroy(): void {
        this.resizeObserver.disconnect();
    }
}
