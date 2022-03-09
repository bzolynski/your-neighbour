import { Directive, HostBinding, HostListener, OnInit } from '@angular/core';
import { TreeViewNodeComponent } from '../../components';

@Directive({
    selector: '[appTreeViewNodeToggle]',
})
export class TreeViewNodeToggleDirective<T> implements OnInit {
    isExpandable: boolean = true;
    @HostBinding('style.cursor') pointer = 'default';
    @HostListener('click', ['$event'])
    click = (e: MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        if (this.isExpandable)
            this.treeViewNodeComponent.isExpandedSubject.next(
                !this.treeViewNodeComponent.isExpanded
            );
    };

    constructor(private treeViewNodeComponent: TreeViewNodeComponent<T>) {}
    ngOnInit(): void {
        this.isExpandable = !this.treeViewNodeComponent.node?.isLeaf ?? false;
        this.setCursorStyle();
    }

    private setCursorStyle = () => {
        this.pointer = this.isExpandable ? 'pointer' : 'default';
    };
}
