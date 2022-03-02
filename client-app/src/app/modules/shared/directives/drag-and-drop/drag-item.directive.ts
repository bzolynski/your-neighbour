import {
    AfterViewInit,
    Directive,
    ElementRef,
    HostListener,
    Renderer2,
} from '@angular/core';

@Directive({
    selector: '[appDragItem]',
})
export class DragItemDirective implements AfterViewInit {
    constructor(
        private elementRef: ElementRef<HTMLElement>,
        private renderer: Renderer2
    ) {}
    ngAfterViewInit(): void {
        this.renderer.setAttribute(
            this.elementRef.nativeElement,
            'draggable',
            'true'
        );
    }
    @HostListener('dragstart', ['$event'])
    dragStart = (e: DragEvent) => {
        e.stopPropagation();

        this.renderer.setAttribute(
            this.elementRef.nativeElement,
            'drag-drop-dragging',
            ''
        );
        console.log(this.elementRef.nativeElement);

        const preview = this.generateDraggingPreview(e);

        const placeholder = this.generatePlaceholderElement();
        this.renderer.insertBefore(
            this.elementRef.nativeElement.parentElement,
            placeholder,
            this.elementRef.nativeElement
        );
        this.generateOverlayElement();
        this.renderer.appendChild(document.body, preview);
        this.renderer.appendChild(document.body, this.elementRef.nativeElement);
    };

    private generatePlaceholderElement = (): HTMLElement => {
        const placeholder: HTMLElement = this.renderer.createElement('div');
        this.renderer.setAttribute(placeholder, 'drag-drop-placeholder', '');

        this.renderer.setStyle(
            placeholder,
            'height',
            `${this.elementRef.nativeElement.clientHeight}px`
        );
        return placeholder;
    };

    private generateDraggingPreview = (e: DragEvent): HTMLElement => {
        const preview: HTMLElement = <HTMLElement>(
            this.elementRef.nativeElement.cloneNode(true)
        );
        this.renderer.setAttribute(preview, 'drag-drop-dragging-preview', '');
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
        console.log(this.elementRef.nativeElement.clientWidth);

        return preview;
    };
    private generateOverlayElement = (): HTMLElement => {
        const overlay: HTMLElement = this.renderer.createElement('div');
        this.renderer.setAttribute(overlay, 'drag-drop-overlay', '');
        this.renderer.listen(document, 'dragover', this.dragOverOverlay);
        this.renderer.appendChild(document.body, overlay);
        return overlay;
    };

    private dragOverOverlay = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const dragDrop = this.renderer.selectRootElement(
            '[drag-drop-dragging-preview]',
            true
        );
        this.renderer.setStyle(
            dragDrop,
            'transform',
            `translate3d(${e.clientX}px, ${e.clientY}px, 0px)`
        );
    };

    @HostListener('dragend', ['$event'])
    dragEnd = (e: DragEvent) => {
        e.stopPropagation();
        const placeholder = this.renderer.selectRootElement(
            '[drag-drop-placeholder]'
        );
        this.renderer.insertBefore(
            placeholder.parentElement,
            this.elementRef.nativeElement,
            placeholder
        );
        this.renderer.removeChild(placeholder.parentElement, placeholder);

        this.renderer.removeChild(
            document.body,
            this.renderer.selectRootElement('[drag-drop-dragging-preview]')
        );

        this.renderer.removeChild(
            document.body,
            this.renderer.selectRootElement('[drag-drop-overlay]')
        );
        this.renderer.removeAttribute(
            this.elementRef.nativeElement,
            'drag-drop-dragging'
        );
    };
}
