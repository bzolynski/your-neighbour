import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonBoxComponent } from './skeleton-box.component';
import { SkeletonModule } from 'primeng/skeleton';

@NgModule({
    imports: [CommonModule, SkeletonModule],
    declarations: [SkeletonBoxComponent],
    exports: [SkeletonBoxComponent],
})
export class SkeletonBoxModule {}
