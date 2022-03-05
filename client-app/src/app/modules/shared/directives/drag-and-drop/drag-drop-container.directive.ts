import {
    AfterViewInit,
    ContentChild,
    ContentChildren,
    Directive,
    ElementRef,
    HostListener,
    QueryList,
    Renderer2,
} from '@angular/core';
import { DragDropItemDirective } from '.';
import { DragDropPlaceholderDirective } from './drag-drop-placeholder.directive';

@Directive({
    selector: '[dragDropContainer]',
})
export class DragDropContainerDirective implements AfterViewInit {
    @ContentChild(DragDropPlaceholderDirective)
    dragDropPlaceholder!: DragDropPlaceholderDirective;

    @ContentChildren(DragDropItemDirective)
    dragDropItems!: QueryList<DragDropItemDirective>;

    constructor(
        private elementRef: ElementRef<HTMLElement>,
        private renderer: Renderer2
    ) {}
    ngAfterViewInit(): void {
        //console.log(this.dragDropPlaceholder);
        if (this.dragDropItems) {
            for (const item of this.dragDropItems) {
                item.placeholderDirective = this.dragDropPlaceholder;
            }
        }
        /*if (this.dragDropPlaceholder) {
            this.dragDropPlaceholder.viewContainerRef.createComponent<DragDropPlaceholderComponent>(
                DragDropPlaceholderComponent
            );
        }*/
    }

    @HostListener('mousemove', ['$event'])
    dragOver = (e: MouseEvent) => {
        //e.preventDefault();
        /*
        const placeholder = <HTMLElement>(
            document.querySelector('[dragDropPlaceholder]')
        );
        if (!placeholder) return;
        //console.log(e);

        this.renderer.setStyle(
            placeholder,
            'transform',
            `translate3d(0px, 0px, 0px)`
        );

        const test2 = this.getElementTest2(e.clientY);

        //x i y to położenie
        //console.log(test.child?.getBoundingClientRect());

        //x i y to położenie
        //console.log(placeholder.getBoundingClientRect());

        if (test2.element) {
            const y =
                test2.element?.getBoundingClientRect().y -
                placeholder.getBoundingClientRect().y;
            const x =
                test2.element?.getBoundingClientRect().x -
                placeholder.getBoundingClientRect().x;
            //console.log(test2.coords);
            this.renderer.setStyle(
                placeholder,
                'transform',
                `translate3d(${x}px, ${y}px, 0px)`
            );
        } else {
            this.renderer.setStyle(
                placeholder,
                'transform',
                `translate3d(0px, 0px, 0px)`
            );
        }*/
        //console.log(test.child);
        //e.stopPropagation();
        /*
        const cos = this.getAfterId(e.clientY);
        const dragging = document.querySelector('[dragDropDragging]');
        if (dragging) {
            if (cos == null || cos.child == undefined)
                this.renderer.appendChild(
                    this.elementRef.nativeElement,
                    dragging
                );

            if (cos.child) {
                this.renderer.insertBefore(
                    this.elementRef.nativeElement,
                    dragging,
                    cos.child
                );
            }
        }*/
    };
    getElementTest2 = (yPosition: number): TestInterface => {
        const draggables = [
            ...this.elementRef.nativeElement.querySelectorAll(
                '[dragDropItem]:not([dragDropDragging=""]), [dragDropPlaceholder]'
            ),
        ];

        return draggables.reduce(
            (test: TestInterface, child: Element) => {
                const box = child.getBoundingClientRect();
                const coords: Coords = {
                    top: box.top,
                    bottom: box.bottom,
                };
                if (coords.top <= yPosition && coords.bottom >= yPosition) {
                    test.element = child;
                    test.coords = coords;
                    return test;
                } else return test;
            },
            {
                coords: {
                    top: -1,
                    bottom: -1,
                },
                element: undefined,
            }
        );
    };
}

interface TestInterface {
    coords: Coords;
    element: Element | undefined;
}

interface Coords {
    top: number;
    bottom: number;
}
