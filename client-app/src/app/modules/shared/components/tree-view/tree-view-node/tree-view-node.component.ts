import {
    AfterViewInit,
    Component,
    ElementRef,
    HostListener,
    Input,
    Renderer2,
    TemplateRef,
} from '@angular/core';
import { Subject } from 'rxjs';
import { ITree } from 'src/app/modules/core/types';
import { NodeMouseLocation, TreeViewService } from '../../../directives';

@Component({
    selector: 'app-tree-view-node',
    templateUrl: './tree-view-node.component.html',
    styleUrls: ['./tree-view-node.component.scss'],
})
export class TreeViewNodeComponent<T> implements AfterViewInit {
    // public properties
    mouseLocation: NodeMouseLocation = 'none';
    mouseLocationChanged: Subject<NodeMouseLocation> = new Subject();
    box: DOMRect | undefined;
    @Input() node!: ITree<T>;
    @Input() template!: TemplateRef<any>;

    // constructor
    constructor(
        private treeService: TreeViewService<T>,
        public elementRef: ElementRef<HTMLElement>,
        private renderer: Renderer2
    ) {
        treeService.nodes.push(this);
        this.mouseLocationChanged.subscribe((x) => {
            this.mouseLocation = x;
        });
    }
    ngAfterViewInit(): void {
        this.box = this.elementRef.nativeElement
            .querySelector('.main-node-content')
            ?.getBoundingClientRect();
    }

    @HostListener('mousedown', ['$event'])
    mouseDown = (e: MouseEvent) => {
        e.stopPropagation();
        this.treeService.dragStart(e, this);
    };
}
