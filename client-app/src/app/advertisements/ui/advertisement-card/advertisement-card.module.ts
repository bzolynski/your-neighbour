import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvertisementCardComponent } from './advertisement-card.component';
import { SkeletonBoxModule } from 'src/app/shared/ui/skeleton-box/skeleton-box.module';
import { SkeletonTextModule } from 'src/app/shared/ui/skeleton-text/skeleton-text.module';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    imports: [CommonModule, SkeletonBoxModule, SkeletonTextModule, MatIconModule],
    declarations: [AdvertisementCardComponent],
    exports: [AdvertisementCardComponent],
})
export class AdvertisementCardModule {}
