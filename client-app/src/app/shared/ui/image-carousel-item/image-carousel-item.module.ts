import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageCarouselItemComponent } from './image-carousel-item.component';

@NgModule({
    imports: [CommonModule],
    declarations: [ImageCarouselItemComponent],
    exports: [ImageCarouselItemComponent],
})
export class ImageCarouselItemModule {}
