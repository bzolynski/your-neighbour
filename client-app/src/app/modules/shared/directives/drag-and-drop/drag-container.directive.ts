import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
    selector: '[appDragContainer]',
})
export class DragContainerDirective {
    constructor(
        private elementRef: ElementRef<HTMLElement>,
        private renderer: Renderer2
    ) {}

    @HostListener('dragover', ['$event'])
    dragOver = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        const cos = this.getAfterId(e.clientY);
        const dragging = document.querySelector('.dragging');

        try {
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
            }
        } catch (error) {
            const x = 'a  ';
            x.trim();
        }
    };

    getAfterId = (
        yPosition: number
    ): { offset: number; child: Element | undefined } => {
        const draggables = [
            ...this.elementRef.nativeElement.querySelectorAll(
                '[draggable="true"]:not(.dragging)'
            ),
        ];

        return draggables.reduce(
            (
                closest: {
                    offset: number;
                    child: Element | undefined;
                },
                child
            ) => {
                const box = child.getBoundingClientRect();
                const offset = yPosition - box.top - box.height / 2;

                if (offset < 0 && offset > closest.offset) {
                    return { offset, child };
                } else return closest;
            },
            {
                offset: Number.NEGATIVE_INFINITY,
                child: undefined,
            }
        );
    };
}
