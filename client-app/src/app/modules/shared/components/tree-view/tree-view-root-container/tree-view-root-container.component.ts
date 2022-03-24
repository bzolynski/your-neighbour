import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { ITree } from 'src/app/modules/core/types';
import { TreeViewService } from '../../../directives';

@Component({
    selector: 'app-tree-view-root-container',
    templateUrl: './tree-view-root-container.component.html',
    styleUrls: ['./tree-view-root-container.component.scss'],
})
export class TreeViewRootContainerComponent<T> implements OnInit {
    @Input() nodeTemplate: TemplateRef<any> | undefined;
    @Input() treeNode: ITree<T> | undefined;
    constructor(public treeService: TreeViewService<T>) {}
    ngOnInit(): void {
        if (!this.nodeTemplate) throw new Error('Provide template for nodes! [nodeTemplate]');
        if (!this.treeNode) throw new Error('Provide tree node root! [treeNode]');
    }
}
