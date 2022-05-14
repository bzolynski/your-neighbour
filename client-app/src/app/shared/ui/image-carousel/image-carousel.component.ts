import { AfterContentChecked, Component, ContentChildren, ElementRef, QueryList, Renderer2, ViewChild } from '@angular/core';
import { ImageCarouselItemComponent } from '../image-carousel-item/image-carousel-item.component';
@Component({
    selector: 'app-image-carousel',
    templateUrl: './image-carousel.component.html',
    styleUrls: ['./image-carousel.component.scss'],
})
export class ImageCarouselComponent implements AfterContentChecked {
    @ContentChildren(ImageCarouselItemComponent, { read: ImageCarouselItemComponent })
    carouselItems!: QueryList<ImageCarouselItemComponent>;

    @ViewChild('container', { static: true }) container!: ElementRef<HTMLElement>;
    selectedImgIndex: number = 0;

    #itemsLoaded: boolean = false;
    constructor(private renderer: Renderer2, private elementRef: ElementRef<HTMLElement>) {}

    ngAfterContentChecked(): void {
        if (!this.#itemsLoaded && this.carouselItems.length > 0) {
            this.renderer.setStyle(
                this.container.nativeElement,
                'height',
                `${this.container.nativeElement.getBoundingClientRect().height * 1.5}px`
            );
            this.#addSnap();
            this.container.nativeElement.scrollBy(1, 0);
            this.#itemsLoaded = true;
        }
    }

    scrollLeft = () => {
        if (this.selectedImgIndex > 0) {
            this.#removeSnap();
            this.selectedImgIndex--;
            this.#addSnap();
            this.container.nativeElement.scrollBy(-1, 0);
        }
    };
    scrollRight = () => {
        if (this.selectedImgIndex < this.carouselItems.length - 1) {
            this.#removeSnap();
            this.selectedImgIndex++;
            this.#addSnap();

            this.container.nativeElement.scrollBy(1, 0);
        }
    };

    #removeSnap = () => {
        this.renderer.removeStyle(this.carouselItems.get(this.selectedImgIndex)?.elemetRef.nativeElement, 'scroll-snap-align');

        this.renderer.removeStyle(this.carouselItems.get(this.selectedImgIndex)?.elemetRef.nativeElement, 'transform');
    };
    #addSnap = () => {
        this.renderer.setStyle(
            this.carouselItems.get(this.selectedImgIndex)?.elemetRef.nativeElement,
            'scroll-snap-align',
            'center'
        );
        this.renderer.setStyle(this.carouselItems.get(this.selectedImgIndex)?.elemetRef.nativeElement, 'transform', 'scale(1.5)');
    };
}
