import { Component, ElementRef } from '@angular/core';

@Component({
    selector: 'app-drag-drop-placeholder',
    templateUrl: './drag-drop-placeholder.component.html',
    styleUrls: ['./drag-drop-placeholder.component.scss'],
})
export class DragDropPlaceholderComponent {
    constructor(public elementRef: ElementRef<HTMLElement>) {}
}
