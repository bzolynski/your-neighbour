import {
    AfterViewInit,
    ContentChild,
    ContentChildren,
    Directive,
    ElementRef,
    HostListener,
    QueryList,
    Renderer2,
    ViewContainerRef,
} from '@angular/core';
import { DragDropItemDirective } from '.';
import { DragDropPlaceholderDirective } from './drag-drop-placeholder.directive';

@Directive({
    selector: '[dragDropContainer]',
})
export class DragDropContainerDirective implements AfterViewInit {
    @ContentChild(DragDropPlaceholderDirective)
    placeholderDirective!: DragDropPlaceholderDirective;

    @ContentChildren(DragDropItemDirective)
    dragDropItemsDirective!: QueryList<DragDropItemDirective>;

    constructor(
        public viewContainerRef: ViewContainerRef,
        private elementRef: ElementRef<HTMLElement>,
        private renderer: Renderer2
    ) {}
    ngAfterViewInit(): void {
        //console.log(this.dragDropPlaceholder);

        if (this.dragDropItemsDirective) {
            for (const item of this.dragDropItemsDirective) {
                item.placeholderDirective = this.placeholderDirective;
            }
        }
        /*if (this.dragDropPlaceholder) {
            this.dragDropPlaceholder.viewContainerRef.createComponent<DragDropPlaceholderComponent>(
                DragDropPlaceholderComponent
            );
        }*/
    }

    @HostListener('mouseover', ['$event'])
    dragOver = (e: MouseEvent) => {
        console.log(e.target);
        if (this.placeholderDirective && this.placeholderDirective.elementRef) {
            const test = this.getElementTest2(e.clientY);
            console.log(test);
        }
        /*
        if (this.placeholderDirective && this.placeholderDirective.elementRef) {
            this.placeholderDirective.move(
                this.elementRef.nativeElement.getBoundingClientRect()
            );
        }*/
    };
    getElementTest2 = (yPosition: number): TestInterface => {
        /*const draggables = [
            ...this.elementRef.nativeElement.querySelectorAll(
                '[dragDropItem]:not([dragDropDragging=""]), [dragDropPlaceholder]'
            ),
        ];
        */
        return this.dragDropItemsDirective.reduce(
            (test: TestInterface, item: DragDropItemDirective) => {
                const box =
                    item.elementRef.nativeElement.getBoundingClientRect();
                const coords: Coords = {
                    top: box.top,
                    bottom: box.bottom,
                };
                if (coords.top <= yPosition && coords.bottom >= yPosition) {
                    test.element = item.elementRef.nativeElement;
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
        // return draggables.reduce(
        //     (test: TestInterface, child: Element) => {
        //         const box = child.getBoundingClientRect();
        //         const coords: Coords = {
        //             top: box.top,
        //             bottom: box.bottom,
        //         };
        //         if (coords.top <= yPosition && coords.bottom >= yPosition) {
        //             test.element = child;
        //             test.coords = coords;
        //             return test;
        //         } else return test;
        //     },
        //     {
        //         coords: {
        //             top: -1,
        //             bottom: -1,
        //         },
        //         element: undefined,
        //     }
        // );
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
