import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[appTreeNode]',
})
export class TreeNodeDirective {
    constructor(
        public template: TemplateRef<any>,
        public viewContainerRef: ViewContainerRef
    ) {}
}
