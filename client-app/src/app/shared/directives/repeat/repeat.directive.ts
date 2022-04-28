import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[appRepeat]',
})
export class RepeatDirective implements OnInit {
    @Input('appRepeat') count = 1;
    constructor(private viewContainerRef: ViewContainerRef, private templateRef: TemplateRef<HTMLElement>) {}

    ngOnInit(): void {
        for (let i = 0; i < this.count; i++) {
            this.viewContainerRef.createEmbeddedView(this.templateRef);
        }
    }
}
