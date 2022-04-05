import { Component, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { ILocalization } from 'src/app/modules/core/models/localization.model';

@Component({
    selector: 'app-advertisement-form-existing-location-select',
    templateUrl: './advertisement-form-existing-location-select.component.html',
    styleUrls: ['./advertisement-form-existing-location-select.component.scss'],
})
export class AdvertisementFormExistingLocationSelectComponent implements OnInit {
    @Input() localizations!: ILocalization[];
    itemSelectPanelOpen: boolean = false;
    @Output() changeLocalization = new Subject<ILocalization>();

    ngOnInit(): void {
        if (!this.localizations) throw new Error('Provide localizations!');
    }
}
