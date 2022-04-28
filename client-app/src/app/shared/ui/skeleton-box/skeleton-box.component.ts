import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-skeleton-box',
    templateUrl: './skeleton-box.component.html',
    styleUrls: ['./skeleton-box.component.scss'],
})
export class SkeletonBoxComponent {
    @Input() animate: boolean = false;
}
