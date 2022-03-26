import {
    Component,
    ComponentRef,
    ElementRef,
    HostBinding,
    Input,
    OnInit,
    TemplateRef,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';
import { Tree } from 'src/app/modules/core/types';
import { TreeViewNodeComponent } from '..';
import { TreeViewService } from '../../../directives';
import { TreeViewRootContainerComponent } from '../tree-view-root-container/tree-view-root-container.component';

@Component({
    selector: 'app-tree-view-unassigned-node-container',
    templateUrl: './tree-view-unassigned-node-container.component.html',
    styleUrls: ['./tree-view-unassigned-node-container.component.scss'],
})
export class TreeViewUnassignedNodeContainerComponent<T> extends TreeViewRootContainerComponent<T> implements OnInit {
    @HostBinding('style.height') height = '100%';
    @HostBinding('style.width') width = '100%';
    @HostBinding('style.display') display = 'inline-block';
    @Input() nodeTemplate!: TemplateRef<any>;
    @Input() items!: Array<T>;
    @ViewChild('container', { static: true, read: ViewContainerRef }) containerRef!: ViewContainerRef;
    get box(): DOMRect {
        return this.elementRef.nativeElement.getBoundingClientRect();
    }
    constructor(treeService: TreeViewService<T>, public elementRef: ElementRef<HTMLElement>) {
        super(treeService, elementRef);
        if (treeService.unassignedContainer) throw new Error('Tree view group can only have one unassigned container!');
        treeService.unassignedContainer = this;
    }
    ngOnInit(): void {
        if (!this.nodeTemplate) throw new Error('Provide template for nodes! [nodeTemplate]');
        if (!this.items) throw new Error('Provide items! [items]');
        this.renderChild();
    }

    renderChild = () => {
        for (const item of this.items) {
            const compRef = this.containerRef.createComponent(TreeViewNodeComponent) as unknown as ComponentRef<
                TreeViewNodeComponent<T>
            >;
            compRef.instance.parentContainer = this;
            compRef.instance.node = new Tree(item);
            compRef.instance.template = this.nodeTemplate;
            compRef.instance.componentRef = compRef;
        }
    };
}
