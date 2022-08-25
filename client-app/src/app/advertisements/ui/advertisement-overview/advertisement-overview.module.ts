import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvertisementOverviewComponent } from './advertisement-overview.component';
import { MatButtonModule } from '@angular/material/button';
import { SkeletonTextModule } from 'src/app/shared/ui/skeleton-text/skeleton-text.module';
import { SkeletonBoxModule } from 'src/app/shared/ui/skeleton-box/skeleton-box.module';
import { ElevatedSectionModule } from 'src/app/shared/directives/elevated-section/elevated-section.module';
import { GalleriaModule } from 'primeng/galleria';
import { CardModule } from 'primeng/card';

@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        SkeletonTextModule,
        SkeletonBoxModule,
        ElevatedSectionModule,
        GalleriaModule,
        CardModule,
    ],
    declarations: [AdvertisementOverviewComponent],
    exports: [AdvertisementOverviewComponent],
})
export class AdvertisementOverviewModule {}
