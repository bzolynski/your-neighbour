import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonBoxComponent } from './skeleton-box.component';

@NgModule({
    imports: [CommonModule],
    declarations: [SkeletonBoxComponent],
    exports: [SkeletonBoxComponent],
})
export class SkeletonBoxModule {}
