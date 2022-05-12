import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Localization } from 'src/app/shared/data-access/models';
import { SettingsMyLocalizationsStore } from '../../data-access';

@Component({
    selector: 'app-settings-my-localizations',
    templateUrl: './settings-my-localizations.component.html',
    styleUrls: ['./settings-my-localizations.component.scss'],
    providers: [SettingsMyLocalizationsStore],
})
export class SettingsMyLocalizationsComponent implements OnInit {
    localizations$: Observable<Localization[] | null> = this.settingsLocalizationStore.localizations$;
    constructor(private settingsLocalizationStore: SettingsMyLocalizationsStore, public dialog: MatDialog) {}

    ngOnInit(): void {
        this.settingsLocalizationStore.loadLocalizations();
    }
    itemFormSubmited = (id: number | undefined, form: FormGroup) => {
        const localization: Localization = { ...form.value } as Localization;
        if (id) this.settingsLocalizationStore.update({ id: id, localization: localization });
        else this.settingsLocalizationStore.createLocalization(localization);
        this.dialog.closeAll();
    };
    deleteLocalization = (id: number) => {
        this.settingsLocalizationStore.delete(id);
    };
}
