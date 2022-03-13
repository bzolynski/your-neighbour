import {
    AfterViewInit,
    ComponentRef,
    ContentChildren,
    Directive,
    ElementRef,
    HostListener,
    OnInit,
    QueryList,
    Renderer2,
} from '@angular/core';
import { Subject } from 'rxjs';
import { DragDropPlaceholderComponent } from '../../components/drag-and-drop/drag-drop-placeholder/drag-drop-placeholder.component';
import { DragDropItemDirective } from './drag-drop-item.directive';

@Directive({
    selector: '[dragDropRootContainer]',
})
export class DragDropRootContainerDirective implements OnInit, AfterViewInit {
    public movingPlaceholder:
        | ComponentRef<DragDropPlaceholderComponent>
        | undefined;

    public movingPlaceholderSubject: Subject<
        ComponentRef<DragDropPlaceholderComponent> | undefined
    > = new Subject<ComponentRef<DragDropPlaceholderComponent> | undefined>();

    @ContentChildren(DragDropItemDirective) items:
        | QueryList<DragDropItemDirective>
        | undefined;

    constructor(
        private elementRef: ElementRef<HTMLElement>,
        private renderer: Renderer2
    ) {}
    ngAfterViewInit(): void {
        setTimeout((_: any) => console.log(this.items));
    }
    ngOnInit(): void {
        this.movingPlaceholderSubject.subscribe(
            (compRef) => (this.movingPlaceholder = compRef)
        );
    }

    @HostListener('mousemove', ['$event'])
    mouseover = (e: MouseEvent) => {
        if (!this.movingPlaceholder) return;

        const item = this.items?.find(
            (x) =>
                !x.dragging &&
                x.currentPosition.top < e.clientY &&
                x.currentPosition.bottom > e.clientY
        );
        if (!item) return;
        const placeholderBox =
            this.movingPlaceholder.instance.elementRef.nativeElement.getBoundingClientRect();
        console.log(item.currentPosition.top - placeholderBox.top);

        item?.move(
            placeholderBox.left - item.currentPosition.left,
            placeholderBox.top - item.currentPosition.top
        );
        this.move(
            item.currentPosition.left - placeholderBox.left,
            item.currentPosition.top - placeholderBox.top
        );
    };
    move = (x: number, y: number) => {
        if (!this.movingPlaceholder) return;
        this.renderer.setStyle(
            this.movingPlaceholder.location.nativeElement,
            'transform',
            `translate3d(${x}px, ${y}px, 0px)`
        );
    };
}
