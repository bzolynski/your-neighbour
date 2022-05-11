import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvertisementCardComponent } from './advertisement-card.component';
import { SkeletonBoxModule } from 'src/app/shared/ui/skeleton-box/skeleton-box.module';
import { SkeletonTextModule } from 'src/app/shared/ui/skeleton-text/skeleton-text.module';
import { MatIconModule } from '@angular/material/icon';
import { CardModule } from 'src/app/shared/ui/card/card.module';
import { CardImgModule } from 'src/app/shared/ui/card-img/card-img.module';
import { CardContentModule } from 'src/app/shared/ui/card-content/card-content.module';
import { CardFooterModule } from 'src/app/shared/ui/card-footer/card-footer.module';

@NgModule({
    imports: [
        CommonModule,
        SkeletonBoxModule,
        SkeletonTextModule,
        MatIconModule,
        CardModule,
        CardImgModule,
        CardContentModule,
        CardFooterModule,
    ],
    declarations: [AdvertisementCardComponent],
    exports: [AdvertisementCardComponent],
})
export class AdvertisementCardModule {}
