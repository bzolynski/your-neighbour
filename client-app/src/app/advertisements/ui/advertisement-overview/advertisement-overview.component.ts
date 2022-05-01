import { Component, Input } from '@angular/core';
import { Advertisement } from '../../data-access/models/advertisement.model';

@Component({
    selector: 'app-advertisement-overview',
    templateUrl: './advertisement-overview.component.html',
    styleUrls: ['./advertisement-overview.component.scss'],
})
export class AdvertisementOverviewComponent {
    @Input() advertisement?: Advertisement | null;
    @Input() loading: boolean = false;
}
