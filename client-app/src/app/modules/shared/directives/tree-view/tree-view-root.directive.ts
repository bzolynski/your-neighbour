import {
    AfterViewInit,
    ChangeDetectorRef,
    ContentChild,
    Directive,
    Input,
    TemplateRef,
} from '@angular/core';
import { ITree } from 'src/app/modules/core/types';
import { TreeNodeDirective } from './tree-view-node.directive';

@Directive({
    selector: '[appTreeViewRoot]',
})
export class TreeViewRootDirective<T> implements AfterViewInit {
    @ContentChild(TreeNodeDirective)
    viewNodeDirective!: TreeNodeDirective;
    constructor(private changeDetector: ChangeDetectorRef) {}

    componentTemplate: TemplateRef<any> | undefined;

    @Input('appTreeViewRoot') node!: ITree<T> | undefined;

    ngAfterViewInit(): void {
        this.componentTemplate = this.viewNodeDirective.template;
        const viewRef =
            this.viewNodeDirective.viewContainerRef.createEmbeddedView(
                this.componentTemplate,
                this.node
            );

        viewRef.context.$implicit = this.node;
        this.changeDetector.detectChanges();
    }
}
