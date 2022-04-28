import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-skeleton-text',
    templateUrl: './skeleton-text.component.html',
    styleUrls: ['./skeleton-text.component.scss'],
})
export class SkeletonTextComponent {
    @Input() rows: number = 1;
    @Input() rowHeight: string = '0.75rem';
    @Input() animate: boolean = false;
}
