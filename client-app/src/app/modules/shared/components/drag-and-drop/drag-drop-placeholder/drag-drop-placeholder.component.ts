import { Component } from '@angular/core';

@Component({
    selector: 'app-drag-drop-placeholder',
    templateUrl: './drag-drop-placeholder.component.html',
    styleUrls: ['./drag-drop-placeholder.component.scss'],
})
export class DragDropPlaceholderComponent {
    JAZDUNIA: boolean = false;
    constructor() {
        console.log('DRAGDROP XD');
    }
}
