import { Component, Input } from '@angular/core';
import { ICategory } from 'src/app/modules/core/models';
import { ITree } from 'src/app/modules/core/types';

@Component({
    selector: 'app-category-tree-item',
    templateUrl: './category-tree-item.component.html',
    styleUrls: ['./category-tree-item.component.scss'],
})
export class CategoryTreeItemComponent {
    @Input() treeItem!: ITree<ICategory>;
    isExpanded: boolean = true;
    triggerExpand = () => {
        this.isExpanded = !this.isExpanded;
    };
}
