import { Directive, HostBinding, HostListener, Input, OnInit } from '@angular/core';
import { TreeViewNodeComponent } from '../components';

@Directive({
    selector: '[appTreeViewNodeToggle]',
})
export class TreeViewNodeToggleDirective<T> implements OnInit {
    isExpandable: boolean = true;
    //@Input('appTreeViewNodeToggle') node!: ITree<T>;
    @Input('appTreeViewNodeToggle') component!: TreeViewNodeComponent<T>;

    @HostBinding('style.cursor') pointer = 'inherit';
    @HostListener('click', ['$event'])
    click = (e: MouseEvent) => {
        e.preventDefault();
        if (this.isExpandable) this.component.isExpanded = !this.component.isExpanded;
    };

    ngOnInit(): void {
        if (!this.component) throw new Error('Provide TreeViewNodeComponent reference!');
        this.component.childContainer.hasNodesChanged.subscribe((hasNodes) => {
            this.isExpandable = hasNodes;
        });
        this.setCursorStyle();
    }

    private setCursorStyle = () => {
        this.pointer = this.isExpandable ? 'pointer' : 'inherit';
    };
}
