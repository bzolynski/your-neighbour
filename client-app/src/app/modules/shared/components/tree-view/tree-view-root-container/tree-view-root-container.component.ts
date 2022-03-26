import { Component, ElementRef, Input, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { ITree } from 'src/app/modules/core/types';
import { TreeViewNodeContainerComponent } from '..';
import { TreeViewService } from '../../../directives';

@Component({
    selector: 'app-tree-view-root-container',
    templateUrl: './tree-view-root-container.component.html',
    styleUrls: ['./tree-view-root-container.component.scss'],
})
export class TreeViewRootContainerComponent<T> extends TreeViewNodeContainerComponent<T> implements OnInit {
    @Input() nodeTemplate: TemplateRef<any> | undefined;
    @Input() treeNode: ITree<T> | undefined;
    @ViewChild('container', { static: true, read: ViewContainerRef }) containerRef!: ViewContainerRef;
    constructor(treeService: TreeViewService<T>, public elementRef: ElementRef<HTMLElement>) {
        super(treeService, elementRef);
        this.treeService.rootContainers.push(this);
    }
    ngOnInit(): void {
        if (!this.nodeTemplate) throw new Error('Provide template for nodes! [nodeTemplate]');
        if (!this.treeNode) throw new Error('Provide tree node root! [treeNode]');
    }
}
