import { Component, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { IItemListing } from '../../data-access/models';

@Component({
    selector: 'app-item-select',
    templateUrl: './item-select.component.html',
    styleUrls: ['./item-select.component.scss'],
})
export class ItemSelectComponent {
    @Output() itemClicked: Subject<number> = new Subject<number>();
    @Input() itemsListing: IItemListing[] | null = null;
    itemSelectPanelOpen: boolean = false;
}
