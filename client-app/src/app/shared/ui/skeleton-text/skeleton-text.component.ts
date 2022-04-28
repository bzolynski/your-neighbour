import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-skeleton-text',
    templateUrl: './skeleton-text.component.html',
    styleUrls: ['./skeleton-text.component.scss'],
})
export class SkeletonTextComponent {
    @Input() rows: number = 1;
}
