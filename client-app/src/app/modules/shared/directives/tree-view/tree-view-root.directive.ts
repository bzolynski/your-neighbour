import { Directive, Input } from '@angular/core';
import { ITree } from 'src/app/modules/core/types';
import { TreeViewService } from './tree-view.service';

@Directive({
    selector: '[appTreeViewRoot]',
})
export class TreeViewRootDirective<T> {
    @Input('appTreeViewRoot') node!: ITree<T> | undefined;
    constructor(private treeService: TreeViewService<T>) {
        treeService.roots.push(this);
    }
}
