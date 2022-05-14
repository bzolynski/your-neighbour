import { AfterContentInit, Component, ContentChildren, ElementRef, QueryList, Renderer2, ViewChild } from '@angular/core';
import { ImageCarouselItemComponent } from '../image-carousel-item/image-carousel-item.component';
@Component({
    selector: 'app-image-carousel',
    templateUrl: './image-carousel.component.html',
    styleUrls: ['./image-carousel.component.scss'],
})
export class ImageCarouselComponent implements AfterContentInit {
    @ContentChildren(ImageCarouselItemComponent, { read: ImageCarouselItemComponent })
    carouselItems!: QueryList<ImageCarouselItemComponent>;

    @ViewChild('wrapper', { static: true }) wrapper!: ElementRef<HTMLElement>;
    selectedImgIndex: number = 0;
    constructor(private renderer: Renderer2, private elementRef: ElementRef<HTMLElement>) {}

    ngAfterContentInit(): void {
        if (this.carouselItems.length < 1) throw new Error('Provide image carousel items! (ng-content)');

        this.renderer.setStyle(
            this.wrapper.nativeElement,
            'height',
            `${this.wrapper.nativeElement.getBoundingClientRect().height * 1.5}px`
        );
        this.#addSnap();
        this.wrapper.nativeElement.scrollBy(1, 0);
    }
    scrollLeft = () => {
        if (this.selectedImgIndex > 0) {
            this.#removeSnap();
            this.selectedImgIndex--;
            this.#addSnap();
            this.wrapper.nativeElement.scrollBy(-1, 0);
        }
    };
    scrollRight = () => {
        if (this.selectedImgIndex < this.carouselItems.length - 1) {
            this.#removeSnap();
            this.selectedImgIndex++;
            this.#addSnap();

            this.wrapper.nativeElement.scrollBy(1, 0);
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
