import { Component, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { Localization } from '@models/';

@Component({
    selector: 'app-localization-card',
    templateUrl: './localization-card.component.html',
    styleUrls: ['./localization-card.component.scss'],
})
export class LocalizationCardComponent {
    @Input() localization?: Localization;
    @Output() deleteButtonClicked = new Subject<number>();
    @Output() setPrimaryClicked = new Subject<number>();
}
