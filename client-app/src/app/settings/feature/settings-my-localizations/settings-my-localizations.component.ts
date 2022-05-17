import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Localization } from 'src/app/shared/data-access/models';
import { LocalizationsStore } from 'src/app/shared/data-access/store/localizations.store';

@Component({
    selector: 'app-settings-my-localizations',
    templateUrl: './settings-my-localizations.component.html',
    styleUrls: ['./settings-my-localizations.component.scss'],
    providers: [LocalizationsStore],
})
export class SettingsMyLocalizationsComponent implements OnInit {
    localizations$: Observable<Localization[] | null> = this.localizationsStore.localizations$;
    constructor(private localizationsStore: LocalizationsStore, public dialog: MatDialog) {}

    ngOnInit(): void {
        this.localizationsStore.loadForLoggedInUser();
    }
    itemFormSubmited = (id: number | undefined, form: FormGroup) => {
        const localization: Localization = { ...form.value } as Localization;
        if (id) this.localizationsStore.update({ id: id, localization: localization });
        else this.localizationsStore.create(localization);
        this.dialog.closeAll();
    };
    deleteLocalization = (id: number) => {
        this.localizationsStore.delete(id);
    };
}
