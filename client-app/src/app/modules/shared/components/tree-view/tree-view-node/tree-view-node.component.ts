import {
    AfterViewInit,
    Component,
    ComponentRef,
    ElementRef,
    HostBinding,
    Input,
    OnDestroy,
    OnInit,
    TemplateRef,
    ViewChild,
} from '@angular/core';
import { fromEvent, Observable, of, Subject } from 'rxjs';
import { delay, mergeMap, takeUntil } from 'rxjs/operators';
import { ITree } from 'src/app/modules/core/types';
import { DropLocation, TreeViewNodeContainerDirective, TreeViewService } from '../../../directives';

@Component({
    selector: 'app-tree-view-node',
    templateUrl: './tree-view-node.component.html',
    styleUrls: ['./tree-view-node.component.scss'],
})
export class TreeViewNodeComponent<T> implements OnInit, AfterViewInit, OnDestroy {
    // public properties
    @HostBinding('style.cursor') cursor = 'auto';
    @Input() node!: ITree<T>;
    @Input() template!: TemplateRef<any>;
    @ViewChild(TreeViewNodeContainerDirective, { static: true })
    childContainer!: TreeViewNodeContainerDirective<T>;
    parentContainer!: TreeViewNodeContainerDirective<T>;
    componentRef!: ComponentRef<TreeViewNodeComponent<T>>;
    dropLocation: DropLocation = 'none';
    dropLocationChanged: Subject<DropLocation> = new Subject();
    get box(): DOMRect | undefined {
        return this.elementRef.nativeElement
            .querySelector('.main-node-content')
            ?.getBoundingClientRect();
    }

    // private members
    mousedown$: Observable<MouseEvent>;
    mouseup$: Observable<MouseEvent>;
    destroy$: Subject<boolean> = new Subject<boolean>();

    // constructor
    constructor(
        private treeService: TreeViewService<T>,
        public elementRef: ElementRef<HTMLElement>
    ) {
        treeService.nodes.push(this);
        this.dropLocationChanged.subscribe((x) => {
            this.dropLocation = x;
        });
        this.mousedown$ = fromEvent<MouseEvent>(this.elementRef.nativeElement, 'mousedown').pipe(
            takeUntil(this.destroy$)
        );
        this.mouseup$ = fromEvent<MouseEvent>(this.elementRef.nativeElement, 'mouseup').pipe(
            takeUntil(this.destroy$)
        );
    }

    ngOnInit(): void {
        if (this.childContainer) this.renderChild();
    }

    ngAfterViewInit(): void {
        this.mousedown$
            .pipe(
                mergeMap((event) => {
                    event.stopPropagation();
                    return of(event).pipe(delay(250), takeUntil(this.mouseup$));
                })
            )
            .subscribe((e) => {
                if (!this.node.isRoot) {
                    this.treeService.dragStart(e, this);
                }
            });
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

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
