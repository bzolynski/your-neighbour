import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Localization } from '@models/';
import { GenericFormControl, GenericFormGroup } from '@app-types/generic-form.type';
import { SettingsAccountStore } from './settings-account.store';
import { selectUser } from '@stores/authentication';
import { combineLatest } from 'rxjs';

@Component({
    selector: 'app-settings-account',
    templateUrl: './settings-account.component.html',
    styleUrls: ['./settings-account.component.scss'],
    providers: [SettingsAccountStore],
})
export class SettingsAccountComponent implements OnInit {
    #user$ = this.store.select(selectUser);
    #localizations$ = this.componentStore.localizations$.pipe();
    #error$ = this.componentStore.error$;
    #status$ = this.componentStore.status$;
    #formOpen$ = this.componentStore.formOpen$;

    vm$ = combineLatest([this.#user$, this.#localizations$, this.#error$, this.#status$, this.#formOpen$]).pipe(
        map(([user, localizations, error, status, formOpen]) => ({
            user,
            localizations: localizations?.filter((x) => !x.isPrimary),
            error,
            status,
            primaryLocalizations: localizations?.filter((x) => x.isPrimary),
            formOpen,
        }))
    );

    accountForm = new GenericFormGroup({
        firstName: new GenericFormControl<string>('', [Validators.required]),
        lastName: new GenericFormControl<string>('', [Validators.required]),
        phoneNumber: new GenericFormControl<string>('', [Validators.required]),
    });
    get firstNameErrorMessage() {
        const control = this.accountForm.controls['firstName'];
        if (control.errors?.required) return 'Pole jest wymagane';
        return '';
    }
    get lastNameErrorMessage() {
        const control = this.accountForm.controls['lastName'];
        if (control.errors?.required) return 'Pole jest wymagane';
        return '';
    }
    get phoneNumberErrorMessage() {
        const control = this.accountForm.controls['phoneNumber'];
        if (control.errors?.required) return 'Pole jest wymagane';
        return '';
    }

    form = new GenericFormGroup({
        id: new GenericFormControl<number>(undefined),
        street: new GenericFormControl<string>('', [Validators.required, Validators.minLength(3)]),
        city: new GenericFormControl<string>('', [Validators.required, Validators.minLength(3)]),
        postCode: new GenericFormControl<string>('', [Validators.required, Validators.minLength(3)]),
        houseNumber: new GenericFormControl<string>('', [Validators.required]),
        flatNumber: new GenericFormControl<string>(''),
    });

    constructor(private store: Store, private componentStore: SettingsAccountStore, public dialog: MatDialog) {}

    ngOnInit(): void {
        this.componentStore.loadLocalizations();
    }
    onOverlayShow(): void {
        this.componentStore.setFormOpen(true);
    }
    onOverlayHide(): void {
        this.form.reset();
        this.componentStore.setFormOpen(false);
    }
    onRowEditInit(localization: Localization): void {
        this.componentStore.setFormOpen(true);
        this.form.patchValue({ ...localization });
    }
    onRowEditSave(localization: Localization): void {
        this.form.markAllAsTouched();
        if (this.form.valid) {
            this.componentStore.updateLocalization({ id: localization.id, localization: { ...this.form.value } });
            this.componentStore.setFormOpen(false);
            this.form.reset();
        }
    }
    onRowEditCancel(): void {
        this.form.reset();
        this.componentStore.setFormOpen(false);
    }
    createLocalization(): void {
        this.form.markAllAsTouched();
        if (this.form.valid) {
            const localization: Localization = { ...this.form.value } as Localization;
            this.componentStore.createLocalization(localization);
        }
    }
    deleteLocalization(localization: Localization): void {
        this.componentStore.deleteLocalization(localization.id);
    }
    setPrimaryLocalization(id: number): void {
        this.componentStore.setPrimaryLocalization(id);
    }
}
