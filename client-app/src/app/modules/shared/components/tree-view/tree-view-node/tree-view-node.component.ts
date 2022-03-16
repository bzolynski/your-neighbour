import {
    Component,
    ComponentRef,
    ElementRef,
    HostBinding,
    HostListener,
    Input,
    OnInit,
    TemplateRef,
    ViewChild,
} from '@angular/core';
import { Subject } from 'rxjs';
import { ITree } from 'src/app/modules/core/types';
import { DropLocation, TreeViewNodeContainerDirective, TreeViewService } from '../../../directives';

@Component({
    selector: 'app-tree-view-node',
    templateUrl: './tree-view-node.component.html',
    styleUrls: ['./tree-view-node.component.scss'],
})
export class TreeViewNodeComponent<T> implements OnInit {
    // public properties
    componentRef!: ComponentRef<TreeViewNodeComponent<T>>;
    mouseLocation: DropLocation = 'none';
    mouseLocationChanged: Subject<DropLocation> = new Subject();
    //box: DOMRect | undefined;
    get box(): DOMRect | undefined {
        return this.elementRef.nativeElement
            .querySelector('.main-node-content')
            ?.getBoundingClientRect();
    }
    parentContainer!: TreeViewNodeContainerDirective<T>;
    @Input() node!: ITree<T>;
    @Input() template!: TemplateRef<any>;
    @ViewChild(TreeViewNodeContainerDirective, { static: true })
    childContainer!: TreeViewNodeContainerDirective<T>;

    @HostBinding('style.cursor') cursor = 'auto';

    // constructor
    constructor(
        private treeService: TreeViewService<T>,
        public elementRef: ElementRef<HTMLElement>
    ) {
        treeService.nodes.push(this);
        this.mouseLocationChanged.subscribe((x) => {
            this.mouseLocation = x;
        });
    }
    ngOnInit(): void {
        if (this.childContainer) this.renderChild();
    }

    @HostListener('mousedown', ['$event'])
    mouseDown = (e: MouseEvent) => {
        if (!this.node.isRoot) {
            e.stopPropagation();
            this.treeService.dragStart(e, this);
        }
    };

    renderChild = () => {
        for (const child of this.node.children) {
            const compRef = this.childContainer.viewContainerRef.createComponent(
                TreeViewNodeComponent
            ) as unknown as ComponentRef<TreeViewNodeComponent<T>>;
            compRef.instance.parentContainer = this.childContainer;
            compRef.instance.node = child;
            compRef.instance.template = this.template;
            compRef.instance.componentRef = compRef;
        }
    };
}
