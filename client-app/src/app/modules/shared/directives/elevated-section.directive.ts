import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
    selector: '[appElevatedSection]',
})
export class ElevatedSectionDirective implements OnInit {
    constructor(private elementRef: ElementRef<HTMLElement>, private renderer: Renderer2) {}
    ngOnInit(): void {
        this.renderer.addClass(this.elementRef.nativeElement, 'elevated-section');
        this.renderer.addClass(this.elementRef.nativeElement, 'mat-elevation-z2');
    }
}
