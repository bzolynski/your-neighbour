import { Component, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { IItem } from 'src/app/shared/data-access/models';

@Component({
    selector: 'app-item-card',
    templateUrl: './item-card.component.html',
    styleUrls: ['./item-card.component.scss'],
})
export class ItemCardComponent {
    @Input() item?: IItem;
    @Input() horizontal: boolean = true;
    @Output() deleteButtonClicked = new Subject<number>();
}
