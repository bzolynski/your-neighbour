import {
    Directive,
    OnInit,
    TemplateRef,
    ViewContainerRef,
} from '@angular/core';
import { TreeViewNodeComponent } from '../../components/tree-view/tree-view-node/tree-view-node.component';

@Directive({
    selector: '[appTreeViewOutlet]',
})
export class TreeViewOutletDirective<T> implements OnInit {
    constructor(
        public viewContainerRef: ViewContainerRef,
        private treeViewNodeComponent: TreeViewNodeComponent<T>
    ) {}

    ngOnInit(): void {
        if (this.treeViewNodeComponent.template)
            this.addChildren(this.treeViewNodeComponent.template);
    }

    addChildren = (template: TemplateRef<any>) => {
        if (!this.treeViewNodeComponent.node?.children) return;
        for (const child of this.treeViewNodeComponent.node.children) {
            const viewRef = this.viewContainerRef.createEmbeddedView(
                template,
                child
            );

            viewRef.context.$implicit = child;
        }
    };
}
