import { Directive, Input } from '@angular/core';
import { ITree } from 'src/app/modules/core/types';
import { TreeViewService } from './tree-view.service';

@Directive({
    selector: '[appTreeViewNode]',
})
export class TreeViewNodeDirective<T> {
    @Input('appTreeViewNode') node: ITree<T> | undefined;
    constructor(private treeService: TreeViewService<T>) {
        treeService.nodes.push(this);
    }
}
