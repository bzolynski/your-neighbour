import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvertisementOverviewComponent } from './advertisement-overview.component';
import { MatButtonModule } from '@angular/material/button';
import { SkeletonTextModule } from 'src/app/shared/ui/skeleton-text/skeleton-text.module';
import { SkeletonBoxModule } from 'src/app/shared/ui/skeleton-box/skeleton-box.module';

@NgModule({
    imports: [CommonModule, MatButtonModule, SkeletonTextModule, SkeletonBoxModule],
    declarations: [AdvertisementOverviewComponent],
    exports: [AdvertisementOverviewComponent],
})
export class AdvertisementOverviewModule {}
