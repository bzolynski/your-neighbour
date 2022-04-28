import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonTextComponent } from './skeleton-text.component';
import { RepeatModule } from '../../directives/repeat/repeat.module';

@NgModule({
    imports: [CommonModule, RepeatModule],
    declarations: [SkeletonTextComponent],
    exports: [SkeletonTextComponent],
})
export class SkeletonTextModule {}
