import {
    AfterViewInit,
    ContentChild,
    Directive,
    ElementRef,
    HostListener,
    Input,
    OnInit,
    Renderer2,
    ViewContainerRef,
} from '@angular/core';
import { DragDropContainerDirective } from '..';
import { DragDropPlaceholderDirective } from './drag-drop-placeholder.directive';

@Directive({
    selector: '[dragDropItem]',
})
export class DragDropItemDirective implements  AfterViewInit {
    public dragging = false;
    private docMouseMoveListener: undefined | (() => void);
    private docMouseUpListener: undefined | (() => void);
    // public placeholderDirective!: DragDropPlaceholderDirective;
    public currentPosition!: Position;

    /* TO JEST GIT */
    @ContentChild(DragDropPlaceholderDirective)
    placeholderDirective!: DragDropPlaceholderDirective;
    @Input() dragDropPlaceholderStyleClasses: Array<string> =
        new Array<string>();
    /****************************/

    constructor(
        public elementRef: ElementRef<HTMLElement>,
        private renderer: Renderer2,
        public viewContainerRef: ViewContainerRef,
        private dragDropContainerDirective: DragDropContainerDirective
    ) {}

    ngAfterViewInit(): void {
        const box = this.elementRef.nativeElement.getBoundingClientRect();
        this.currentPosition = new Position(
            box.top,
            box.top + 32,
            box.left,
            box.right
        );
        console.log(this.currentPosition);
        console.log(this.elementRef);
    }

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
        this.placeholderDirective.create();
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

        if (this.placeholderDirective.placehodlerComponentRef) {
            const placeholder =
                this.placeholderDirective.placehodlerComponentRef.nativeElement;

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

    move = (x: number, y: number) => {
        this.renderer.setStyle(
            this.elementRef.nativeElement,
            'transform',
            `translate3d(${x}px, ${y}px, 0px)`
        );
        // this.currentPosition.top += y;
        // this.currentPosition.bottom += y;
        // this.currentPosition.left += x;
        // this.currentPosition.right += x;
    };
}

export interface IPosition {
    top: number;
    bottom: number;
    left: number;
    right: number;
}

export class Position implements IPosition {
    constructor(
        public top: number,
        public bottom: number,
        public left: number,
        public right: number
    ) {}
    addTo = (offset: IPosition) => {
        this.top = offset.top;
        this.bottom = offset.bottom;
        this.left = offset.left;
        this.right = offset.right;
    };
}
