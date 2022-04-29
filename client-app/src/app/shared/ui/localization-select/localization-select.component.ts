import { Component, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { Localization } from '../../data-access/models';

@Component({
    selector: 'app-localization-select',
    templateUrl: './localization-select.component.html',
    styleUrls: ['./localization-select.component.scss'],
})
export class LocalizationSelectComponent implements OnInit {
    @Input() localizations!: Localization[];
    itemSelectPanelOpen: boolean = false;
    @Output() localizationSelected = new Subject<Localization>();

    ngOnInit(): void {
        if (!this.localizations) throw new Error('Provide localizations!');
    }
}
