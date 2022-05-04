import { Component, Input } from '@angular/core';
import { ICategory } from 'src/app/shared/data-access/models';

@Component({
    selector: 'app-list-side-panel',
    templateUrl: './list-side-panel.component.html',
    styleUrls: ['./list-side-panel.component.scss'],
})
export class ListSidePanelComponent {
    @Input() category?: ICategory | null;
}
