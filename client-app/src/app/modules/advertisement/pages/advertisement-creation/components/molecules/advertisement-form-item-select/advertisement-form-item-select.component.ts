import { Component, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { IItemListing } from 'src/app/modules/core/models/item.model';

@Component({
    selector: 'app-advertisement-form-item-select',
    templateUrl: './advertisement-form-item-select.component.html',
    styleUrls: ['./advertisement-form-item-select.component.scss'],
})
export class AdvertisementFormItemSelectComponent {
    @Output() itemClicked: Subject<number> = new Subject<number>();
    @Input() itemsListing: IItemListing[] | null = null;
    itemSelectPanelOpen: boolean = false;
}
