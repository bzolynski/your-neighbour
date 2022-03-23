import { Directive, HostBinding, HostListener, Input, OnInit } from '@angular/core';
import { ITree } from 'src/app/modules/core/types';

@Directive({
    selector: '[appTreeViewNodeToggle]',
})
export class TreeViewNodeToggleDirective<T> implements OnInit {
    isExpandable: boolean = true;
    @Input('appTreeViewNodeToggle') node!: ITree<T>;
    @HostBinding('style.cursor') pointer = 'inherit';
    @HostListener('click', ['$event'])
    click = (e: MouseEvent) => {
        e.preventDefault();
        if (this.isExpandable) this.node.isExpanded = !this.node.isExpanded;
    };

    ngOnInit(): void {
        this.isExpandable = !this.node.isLeaf;
        this.setCursorStyle();
    }

    private setCursorStyle = () => {
        this.pointer = this.isExpandable ? 'pointer' : 'inherit';
    };
}
