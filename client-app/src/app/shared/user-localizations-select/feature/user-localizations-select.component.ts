import { Component, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { ILocalization } from '../../data-access/models';
import { UserLocalizationsStore } from '../data-access/store/user-localizations-select.store';

@Component({
    selector: 'app-user-localizations-select',
    templateUrl: './user-localizations-select.component.html',
    styleUrls: ['./user-localizations-select.component.scss'],
    providers: [UserLocalizationsStore],
})
export class UserLocalizationsSelectComponent implements OnInit {
    @Output() localizationSelected = new Subject<ILocalization>();
    @Input() set addLocalization(value: ILocalization) {
        this.userLocalizationStore.addLocalization(value);
    }
    localizations$ = this.userLocalizationStore.localizations$;
    constructor(private userLocalizationStore: UserLocalizationsStore) {}
    ngOnInit(): void {
        this.userLocalizationStore.loadUserLocalizations();
    }
}
