import { Directive, ElementRef, Renderer2 } from '@angular/core';
import { DragDropPlaceholderComponent } from '../../components/drag-and-drop/drag-drop-placeholder/drag-drop-placeholder.component';
import { DragDropItemDirective } from './drag-drop-item.directive';
import { DragDropRootContainerDirective } from './drag-drop-root-container.directive';

@Directive({
    selector: '[dragDropPlaceholder]',
})
export class DragDropPlaceholderDirective {
    public placehodlerComponentRef: ElementRef<HTMLElement> | undefined;
    private initialPosition!: DOMRect;
    constructor(
        private renderer: Renderer2,
        private dragDropItem: DragDropItemDirective,
        private dragDropRootContainer: DragDropRootContainerDirective
    ) {}

    create = () => {
        this.dragDropItem.viewContainerRef.clear();
        const componentRef =
            this.dragDropItem.viewContainerRef.createComponent<DragDropPlaceholderComponent>(
                DragDropPlaceholderComponent
            );

        this.placehodlerComponentRef = componentRef.location;
        const ngcontentAttribute =
            [...this.dragDropItem.elementRef.nativeElement.attributes].find(
                (x) => x.name.startsWith('_ngcontent')
            )?.name ?? '';

        this.renderer.setAttribute(
            this.placehodlerComponentRef.nativeElement,
            ngcontentAttribute,
            ''
        );
        this.dragDropRootContainer.movingPlaceholderSubject.next(componentRef);
        for (const styleClass of this.dragDropItem
            .dragDropPlaceholderStyleClasses) {
            console.log(styleClass);

            this.renderer.addClass(
                this.placehodlerComponentRef.nativeElement,
                styleClass
            );
        }

        this.setStyles();
        this.initialPosition =
            this.placehodlerComponentRef.nativeElement.getBoundingClientRect();
    };

    private setStyles = () => {
        if (!this.placehodlerComponentRef) return;

        this.renderer.setStyle(
            this.placehodlerComponentRef.nativeElement,
            'height',
            `${this.dragDropItem.elementRef.nativeElement.clientHeight}px`
        );
        this.renderer.setStyle(
            this.placehodlerComponentRef.nativeElement,
            'display',
            `block`
        );
        this.renderer.setStyle(
            this.placehodlerComponentRef.nativeElement,
            'pointer-events',
            `none`
        );
    };

    move = (box: DOMRect) => {
        console.log();
        console.log(this.placehodlerComponentRef?.nativeElement);

        if (!this.placehodlerComponentRef) return;
        const x = box.x - this.initialPosition.x;
        const y = box.y - this.initialPosition.y;
        console.log(x, y);
        this.renderer.setStyle(
            this.placehodlerComponentRef.nativeElement,
            'transform',
            `translate3d(${x}px, ${y}px, 0px)`
        );
    };

    remove = () => {
        this.dragDropItem.viewContainerRef.remove();
        this.placehodlerComponentRef = undefined;
        this.dragDropRootContainer.movingPlaceholderSubject.next(undefined);
    };
}
