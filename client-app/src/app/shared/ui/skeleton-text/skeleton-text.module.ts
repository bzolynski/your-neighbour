import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonTextComponent } from './skeleton-text.component';
import { RepeatModule } from '../../directives/repeat/repeat.module';
import { SkeletonModule } from 'primeng/skeleton';
@NgModule({
    imports: [CommonModule, RepeatModule, SkeletonModule],
    declarations: [SkeletonTextComponent],
    exports: [SkeletonTextComponent],
})
export class SkeletonTextModule {}
