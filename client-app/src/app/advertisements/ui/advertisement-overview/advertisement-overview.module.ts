import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvertisementOverviewComponent } from './advertisement-overview.component';
import { SkeletonTextModule } from 'src/app/shared/ui/skeleton-text/skeleton-text.module';
import { SkeletonBoxModule } from 'src/app/shared/ui/skeleton-box/skeleton-box.module';
import { GalleriaModule } from 'primeng/galleria';
import { CardModule } from 'primeng/card';
import { SharedModule } from '@shared/shared.module';

@NgModule({
    imports: [CommonModule, SkeletonTextModule, SkeletonBoxModule, GalleriaModule, CardModule, SharedModule],
    declarations: [AdvertisementOverviewComponent],
    exports: [AdvertisementOverviewComponent],
})
export class AdvertisementOverviewModule {}
