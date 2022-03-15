import {
    AfterViewInit,
    Component,
    ElementRef,
    Input,
    TemplateRef,
} from '@angular/core';
import { ITree } from 'src/app/modules/core/types';
import { TreeViewService } from '../../../directives';

@Component({
    selector: 'app-tree-view-node',
    templateUrl: './tree-view-node.component.html',
    styleUrls: ['./tree-view-node.component.scss'],
})
export class TreeViewNodeComponent<T> implements AfterViewInit {
    box: DOMRect | undefined;
    @Input() node!: ITree<T>;
    @Input() template!: TemplateRef<any>;

    constructor(
        public treeService: TreeViewService<T>,
        private elementRef: ElementRef<HTMLElement>
    ) {
        treeService.nodes.push(this);
    }
    ngAfterViewInit(): void {
        this.box = this.elementRef.nativeElement
            .querySelector('.main-node-content')
            ?.getBoundingClientRect();
        console.log(this.box);
    }
}
