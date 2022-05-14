import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvertisementOverviewComponent } from './advertisement-overview.component';
import { MatButtonModule } from '@angular/material/button';
import { SkeletonTextModule } from 'src/app/shared/ui/skeleton-text/skeleton-text.module';
import { SkeletonBoxModule } from 'src/app/shared/ui/skeleton-box/skeleton-box.module';
import { ImageCarouselModule } from 'src/app/shared/ui/image-carousel/image-carousel.module';
import { ImageCarouselItemModule } from 'src/app/shared/ui/image-carousel-item/image-carousel-item.module';
import { ElevatedSectionModule } from 'src/app/shared/directives/elevated-section/elevated-section.module';

@NgModule({
    imports: [CommonModule, MatButtonModule, SkeletonTextModule, SkeletonBoxModule, ImageCarouselModule, ImageCarouselItemModule, ElevatedSectionModule],
    declarations: [AdvertisementOverviewComponent],
    exports: [AdvertisementOverviewComponent],
})
export class AdvertisementOverviewModule {}
