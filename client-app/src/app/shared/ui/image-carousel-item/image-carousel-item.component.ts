import { Component, ElementRef, Input } from '@angular/core';

@Component({
    selector: 'app-image-carousel-item',
    templateUrl: './image-carousel-item.component.html',
    styleUrls: ['./image-carousel-item.component.scss'],
})
export class ImageCarouselItemComponent {
    @Input() src?: string;
    constructor(public elemetRef: ElementRef<HTMLElement>) {}
}
