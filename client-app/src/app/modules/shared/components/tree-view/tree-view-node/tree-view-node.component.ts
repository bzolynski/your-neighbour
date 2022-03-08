import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { ITree } from 'src/app/modules/core/types';
import { TreeViewRootDirective } from '../../../directives/tree-view';

@Component({
    selector: 'app-tree-view-node',
    templateUrl: './tree-view-node.component.html',
    styleUrls: ['./tree-view-node.component.scss'],
})
export class TreeViewNodeComponent<T> implements OnInit {
    @Input() node: ITree<T> | undefined;

    template: TemplateRef<any> | undefined;
    constructor(private root: TreeViewRootDirective<T>) {}
    ngOnInit(): void {
        this.template = this.root.componentTemplate;
    }
}
