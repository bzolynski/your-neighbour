import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardImgComponent } from './card-img.component';
import { SkeletonBoxModule } from '../skeleton-box/skeleton-box.module';

@NgModule({
    imports: [CommonModule, SkeletonBoxModule],
    declarations: [CardImgComponent],
    exports: [CardImgComponent],
})
export class CardImgModule {}
