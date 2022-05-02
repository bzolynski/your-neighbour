import { Component, Input } from '@angular/core';
import { Advertisement } from '../../data-access/models/advertisement.model';

@Component({
    selector: 'app-advertisement-card',
    templateUrl: './advertisement-card.component.html',
    styleUrls: ['./advertisement-card.component.scss'],
})
export class AdvertisementCardComponent {
    @Input() advertisement?: Advertisement | null;
    @Input() loading: boolean = false;
    @Input() horizontal: boolean = true;
}
