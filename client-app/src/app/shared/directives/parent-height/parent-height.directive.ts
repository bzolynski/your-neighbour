import { Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';

@Directive({
    selector: '[appParentHeight]',
})
export class ParentHeightDirective implements OnInit, OnDestroy {
    @Input('appParentHeight') percentage: number = 100;
    constructor(private elementRef: ElementRef<HTMLElement>, private renderer: Renderer2) {}

    private resizeObserver = new ResizeObserver((entries) => {
        entries.forEach((entry) => {
            this.renderer.setStyle(
                this.elementRef.nativeElement,
                'height',
                `${(entry.contentRect.height * this.percentage) / 100}px`
            );
        });
    });
    ngOnInit(): void {
        const parent = this.elementRef.nativeElement.parentElement;
        if (parent) this.resizeObserver.observe(parent);
        else this.renderer.setStyle(this.elementRef.nativeElement, 'height', `${100}%`);
    }
    ngOnDestroy(): void {
        this.resizeObserver.disconnect();
    }
}
