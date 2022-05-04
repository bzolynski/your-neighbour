import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListSidePanelComponent } from './list-side-panel.component';
import { SkeletonTextModule } from 'src/app/shared/ui/skeleton-text/skeleton-text.module';
import { RouterModule } from '@angular/router';
import { RepeatModule } from 'src/app/shared/directives/repeat/repeat.module';

@NgModule({
    imports: [CommonModule, SkeletonTextModule, RouterModule, RepeatModule],
    declarations: [ListSidePanelComponent],
    exports: [ListSidePanelComponent],
})
export class ListSidePanelModule {}
