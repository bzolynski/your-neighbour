import { Component, Output } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ListViewType } from '../list-container/list-container.component';

@Component({
    selector: 'app-list-container-toggle-buttons',
    templateUrl: './list-container-toggle-buttons.component.html',
    styleUrls: ['./list-container-toggle-buttons.component.scss'],
})
export class ListContainerToggleButtonsComponent {
    @Output() listViewTypeChanged = new BehaviorSubject<ListViewType>('list');
    selectedlistViewType$: Observable<ListViewType> = this.listViewTypeChanged.asObservable();
}
