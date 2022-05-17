import { AfterContentInit, Directive, ElementRef, HostListener, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Directive({
    selector: '[appTriggerOnScroll]',
    providers: [{ provide: Window, useValue: window }],
})
export class TriggerOnScrollDirective implements AfterContentInit {
    @HostListener('window:scroll', [])
    onScroll = () => {
        this.#trigger();
    };
    @Output('appTriggerOnScroll') trigger = new Subject<any>();
    @Input('appTriggerOnScrollUntill') untill: boolean = false;
    #triggered: boolean = false;

    constructor(private window: Window, private elementRef: ElementRef<HTMLElement>) {}

    ngAfterContentInit(): void {
        this.#trigger();
    }

    #trigger = () => {
        if (this.#triggered || this.untill) return;
        const { top } = this.elementRef.nativeElement.getBoundingClientRect();
        if (this.window.scrollY + this.window.innerHeight >= top) {
            this.#triggered = true;
            this.trigger.next();
        }
    };
}
