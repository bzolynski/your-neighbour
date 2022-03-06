import {
    AfterViewInit,
    Directive,
    ElementRef,
    HostListener,
    Renderer2,
    ViewContainerRef,
    ViewRef,
} from '@angular/core';
import { DragDropPlaceholderDirective } from './drag-drop-placeholder.directive';

@Directive({
    selector: '[dragDropItem]',
})
export class DragDropItemDirective implements AfterViewInit {
    public dragging = false;
    private docMouseMoveListener: undefined | (() => void);
    private docMouseUpListener: undefined | (() => void);
    public placeholderDirective!: DragDropPlaceholderDirective;
    public initialPosition!: DOMRect;
    public dragDropContainerViewRef!: ViewRef;

    constructor(
        public elementRef: ElementRef<HTMLElement>,
        private renderer: Renderer2,
        public viewContainerRef: ViewContainerRef
    ) {}
    ngAfterViewInit(): void {
        this.initialPosition =
            this.elementRef.nativeElement.getBoundingClientRect();
    }

    @HostListener('mouseover', ['$event'])
    mouseOver = (e: MouseEvent) => {
        e.stopPropagation();
        /* if (this.placeholderDirective && this.placeholderDirective.elementRef) {
            this.placeholderDirective.move(
                this.elementRef.nativeElement.getBoundingClientRect()
            );
        }
        if (this.placeholderDirective) {
            this.placeholderDirective.create(
                this.elementRef.nativeElement.clientHeight
            );
        }*/
    };
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
        //this.viewContainerRef.detach();
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

        if (this.placeholderDirective.elementRef) {
            const placeholder =
                this.placeholderDirective.elementRef.nativeElement;

            //this.viewContainerRef.get(1) <- zwraca null albo ViefRef
            console.log('DROP CONT REF');
            //console.log(this.dragDropContainerRef.);

            //this.viewContainerRef.insert(this.dragDropContainerViewRef);

            this.renderer.insertBefore(
                placeholder.parentElement,
                this.elementRef.nativeElement,
                placeholder
            );
            console.log('REMOVE');

            this.placeholderDirective.remove();

            this.renderer.removeChild(
                document.body,
                this.renderer.selectRootElement('[dragDropDraggingPreview]')
            );

            this.renderer.removeAttribute(
                this.elementRef.nativeElement,
                'dragDropDragging'
            );
        }
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
