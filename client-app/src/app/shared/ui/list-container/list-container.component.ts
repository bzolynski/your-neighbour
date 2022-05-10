import { Component, Input } from '@angular/core';

export type ListViewType = 'list' | 'card';

@Component({
    selector: 'app-list-container',
    templateUrl: './list-container.component.html',
    styleUrls: ['./list-container.component.scss'],
})
export class ListContainerComponent {
    @Input() listViewType: ListViewType = 'list';
}
