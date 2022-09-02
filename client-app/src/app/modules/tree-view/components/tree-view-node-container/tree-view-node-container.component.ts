import { Component, ComponentRef, ElementRef, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';
import { TreeViewNodeComponent } from '..';
import { ITree } from '@app-types/.';
import { TreeViewService } from '../../services';

@Component({
    selector: 'app-tree-view-node-container',
    templateUrl: './tree-view-node-container.component.html',
    styleUrls: ['./tree-view-node-container.component.scss'],
})
export class TreeViewNodeContainerComponent<T> {
    nodes: Array<TreeViewNodeComponent<T>> = new Array<TreeViewNodeComponent<T>>();
    hasNodesChanged: Subject<boolean> = new Subject();
    @ViewChild('container', { static: true, read: ViewContainerRef }) containerRef!: ViewContainerRef;
    get box(): DOMRect {
        return this.elementRef.nativeElement.getBoundingClientRect();
    }

    constructor(
        protected treeService: TreeViewService<T>,
        public elementRef: ElementRef<HTMLElement>,
        public nodeComponent?: TreeViewNodeComponent<T>
    ) {}

    isCursorOver = (e: MouseEvent): boolean => {
        const xBool = this.box.left < e.x && this.box.right > e.x;
        const yBool = this.box.top < e.y && this.box.bottom > e.y;
        return xBool && yBool;
    };

    renderNode = (node: ITree<T>, template: TemplateRef<any>): void => {
        const compRef = this.containerRef.createComponent(TreeViewNodeComponent) as unknown as ComponentRef<
            TreeViewNodeComponent<T>
        >;
        compRef.instance.parentContainer = this;
        compRef.instance.node = node;
        compRef.instance.template = template;
        compRef.instance.componentRef = compRef;
        this.nodes.push(compRef.instance);
    };

    positionOf = (node: TreeViewNodeComponent<T>): number => {
        return this.containerRef.indexOf(node.componentRef.hostView);
    };

    insertNode = (node: TreeViewNodeComponent<T>, index?: number | undefined): void => {
        this.containerRef.insert(node.componentRef.hostView, index);
        node.changeParent.next(this);
        this.nodes.push(node);
        this.hasNodesChanged.next(this.nodes.length > 0);
    };

    removeNode = (node: TreeViewNodeComponent<T>) => {
        this.nodes.splice(this.nodes.indexOf(node), 1);
        this.hasNodesChanged.next(this.nodes.length > 0);
    };
}
