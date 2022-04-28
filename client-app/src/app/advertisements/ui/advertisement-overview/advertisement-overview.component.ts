import { Component, Input } from '@angular/core';
import { IItem, ILocalization } from 'src/app/shared/data-access/models';

@Component({
    selector: 'app-advertisement-overview',
    templateUrl: './advertisement-overview.component.html',
    styleUrls: ['./advertisement-overview.component.scss'],
})
export class AdvertisementOverviewComponent {
    @Input() item?: IItem;
    @Input() localization?: ILocalization;
}
