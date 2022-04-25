import { Component, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { ILocalization } from '../../data-access/models';

@Component({
    selector: 'app-localization-select',
    templateUrl: './localization-select.component.html',
    styleUrls: ['./localization-select.component.scss'],
})
export class LocalizationSelectComponent implements OnInit {
    @Input() localizations!: ILocalization[];
    itemSelectPanelOpen: boolean = false;
    @Output() changeLocalization = new Subject<ILocalization>();

    ngOnInit(): void {
        if (!this.localizations) throw new Error('Provide localizations!');
    }
}
