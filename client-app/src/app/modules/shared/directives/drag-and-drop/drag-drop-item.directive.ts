import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { DragDropPlaceholderDirective } from './drag-drop-placeholder.directive';

@Directive({
    selector: '[dragDropItem]',
})
export class DragDropItemDirective {
    public dragging = false;
    private docMouseMoveListener: undefined | (() => void);
    private docMouseUpListener: undefined | (() => void);
    public placeholderDirective!: DragDropPlaceholderDirective;

    constructor(
        private elementRef: ElementRef<HTMLElement>,
        private renderer: Renderer2
    ) {}
    /*
    @HostListener('mouseover', ['$event'])
    mouseOver = (e: MouseEvent) => {
        e.stopPropagation();
        //e.stopImmediatePropagation();
        const placeholder = <HTMLElement>(
            document.querySelector('[dragDropPlaceholder]')
        );
        if (!placeholder) return;
        const box = this.elementRef.nativeElement.getBoundingClientRect();
        if (e.clientY < box.top && e.clientY > box.bottom) return;
        //if (e.clientY <= box.bottom && e.clientY >= box.top) {
        console.log('WESZŁO XDDDDDDDDDDDDDDDDDDD');
        //}
    };
*/
    @HostListener('mousedown', ['$event'])
    dragStart = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        this.dragging = true;
        this.renderer.setAttribute(
            this.elementRef.nativeElement,
            'dragDropDragging',
            ''
        );
        const preview = this.generateDraggingPreview(e);
        this.renderer.appendChild(document.body, preview);
        this.renderer.appendChild(document.body, this.elementRef.nativeElement);
        this.docMouseMoveListener = this.renderer.listen(
            document,
            'mousemove',
            this.dragContinue
        );
        this.docMouseUpListener = this.renderer.listen(
            document,
            'mouseup',
            this.dragEnd
        );
        if (this.placeholderDirective) {
            this.placeholderDirective.create(
                this.elementRef.nativeElement.clientHeight
            );
            /*this.placeholderDirective.move(
                this.elementRef.nativeElement.getBoundingClientRect()
            );*/
        }
    };

    private generateDraggingPreview = (e: MouseEvent): HTMLElement => {
        const preview: HTMLElement = <HTMLElement>(
            this.elementRef.nativeElement.cloneNode(true)
        );

        this.renderer.setAttribute(preview, 'dragDropDraggingPreview', '');
        this.renderer.setStyle(
            preview,
            'height',
            `${this.elementRef.nativeElement.clientHeight}px`
        );
        this.renderer.setStyle(
            preview,
            'width',
            `${this.elementRef.nativeElement.clientWidth}px`
        );
        this.renderer.setStyle(
            preview,
            'transform',
            `translate3d(${e.clientX}px, ${e.clientY}px, 0px)`
        );

        return preview;
    };

    private dragContinue = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        this.movePreview(e);
        /*        const placeholder = <HTMLElement>(
            document.querySelector('[dragDropPlaceholder]')
        );
        const test2 = this.getElementTest2(e.clientY);

        if (test2.element) {
            const test2box = test2.element?.getBoundingClientRect();
            const placeholderBox = placeholder.getBoundingClientRect();
            if (
                test2box.x == placeholderBox.x &&
                test2box.y == placeholderBox.y
            )
                return;
            const y = test2box.y - placeholderBox.y;
            const x = test2box.x - placeholderBox.x;
            console.log(`x: ${x} | y: ${y}`);

            this.renderer.setStyle(
                placeholder,
                'transform',
                `translate3d(${x}px, ${y}px, 0px)`
            );
        } /*else {
            this.renderer.setStyle(
                placeholder,
                'transform',
                `translate3d(0px, 0px, 0px)`
            );
        }*/
    };

    getElementTest2 = (yPosition: number): TestInterface => {
        const draggables = [
            ...document.querySelectorAll(
                '[dragDropItem]:not([dragDropDragging=""])'
            ),
        ];

        return draggables.reduce(
            (test: TestInterface, child: Element) => {
                const box = child.getBoundingClientRect();
                const coords: Coords = {
                    top: box.top,
                    bottom: box.bottom,
                };
                if (
                    coords.top <= yPosition &&
                    coords.bottom - 10 >= yPosition
                ) {
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

    private movePreview = (e: MouseEvent) => {
        const preview = this.renderer.selectRootElement(
            '[dragDropDraggingPreview]',
            true
        );
        this.renderer.setStyle(
            preview,
            'transform',
            `translate3d(${e.clientX}px, ${e.clientY}px, 0px)`
        );
    };
    private dragEnd = (e: MouseEvent) => {
        if (this.docMouseMoveListener) this.docMouseMoveListener();
        if (this.docMouseUpListener) this.docMouseUpListener();
        e.stopPropagation();
        this.dragging = false;
        const placeholder = this.placeholderDirective.elementRef.nativeElement;
        this.renderer.insertBefore(
            placeholder.parentElement,
            this.elementRef.nativeElement,
            placeholder
        );
        placeholder.remove();

        this.renderer.removeChild(
            document.body,
            this.renderer.selectRootElement('[dragDropDraggingPreview]')
        );

        this.renderer.removeAttribute(
            this.elementRef.nativeElement,
            'dragDropDragging'
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
