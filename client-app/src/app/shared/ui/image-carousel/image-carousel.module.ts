import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageCarouselComponent } from './image-carousel.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    imports: [CommonModule, MatButtonModule, MatIconModule],
    declarations: [ImageCarouselComponent],
    exports: [ImageCarouselComponent],
})
export class ImageCarouselModule {}
