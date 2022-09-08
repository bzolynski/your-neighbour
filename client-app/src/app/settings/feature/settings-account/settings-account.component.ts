import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Localization, User } from '@models/';
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
    #localizationFormOpen$ = this.componentStore.localizationFormOpen$;
    #localizationFormStatus$ = this.componentStore.localizationFormStatus$;
    #nameFormOpen$ = this.componentStore.nameFormOpen$;
    #nameFormStatus$ = this.componentStore.nameFormStatus$;
    #emailFormOpen$ = this.componentStore.emailFormOpen$;
    #emailFormStatus$ = this.componentStore.emailFormStatus$;
    #numberFormOpen$ = this.componentStore.numberFormOpen$;
    #numberFormStatus$ = this.componentStore.numberFormStatus$;

    vm$ = combineLatest([
        combineLatest([this.#user$, this.#localizations$, this.#error$, this.#status$]),
        combineLatest([this.#localizationFormOpen$, this.#nameFormOpen$, this.#emailFormOpen$, this.#numberFormOpen$]),
        combineLatest([this.#localizationFormStatus$, this.#nameFormStatus$, this.#emailFormStatus$, this.#numberFormStatus$]),
    ]).pipe(
        map(
            ([
                [user, localizations, error, status],
                [localizationFormOpen, nameFormOpen, emailFormOpen, numberFormOpen],
                [localizationFormStatus, nameFormStatus, emailFormStatus, numberFormStatus],
            ]) => ({
                user,
                localizations: localizations?.filter((x) => !x.isPrimary),
                error,
                status,
                primaryLocalizations: localizations?.filter((x) => x.isPrimary),
                localizationFormOpen,
                nameFormOpen,
                emailFormOpen,
                numberFormOpen,
                localizationFormStatus,
                nameFormStatus,
                emailFormStatus,
                numberFormStatus,
            })
        )
    );

    nameForm = new GenericFormGroup({
        firstName: new GenericFormControl<string>('', [Validators.required]),
        lastName: new GenericFormControl<string>('', [Validators.required]),
    });
    emailForm = new GenericFormGroup({
        email: new GenericFormControl<string>('', [Validators.required, Validators.email]),
    });
    numberForm = new GenericFormGroup({
        phoneNumber: new GenericFormControl<string>('', [Validators.required]),
    });
    get firstNameErrorMessage() {
        const control = this.nameForm.controls['firstName'];
        if (control.errors?.required) return 'Pole jest wymagane';
        return '';
    }
    get lastNameErrorMessage() {
        const control = this.nameForm.controls['lastName'];
        if (control.errors?.required) return 'Pole jest wymagane';
        return '';
    }
    get emailErrorMessage() {
        const control = this.emailForm.controls['email'];
        if (control.errors?.required) return 'Pole jest wymagane';
        if (control.errors?.email) return 'Musi to być email ';
        return '';
    }
    get phoneNumberErrorMessage() {
        const control = this.numberForm.controls['phoneNumber'];
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

    constructor(private store: Store, protected componentStore: SettingsAccountStore, public dialog: MatDialog) {}

    ngOnInit(): void {
        this.componentStore.loadLocalizations();
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
    openNameForm(user: User): void {
        this.nameForm.setValue({ firstName: user.firstName, lastName: user.lastName });
        this.componentStore.setNameFormOpen(true);
    }
    submitNameForm(): void {
        if (this.nameForm.valid) {
            this.componentStore.updateName({ ...this.nameForm.value });
        }
    }

    openEmailForm(user: User): void {
        this.emailForm.setValue({ email: user.email });
        this.componentStore.setEmailFormOpen(true);
    }
    submitEmailForm(): void {
        if (this.emailForm.valid) {
            this.componentStore.updateEmail({ ...this.emailForm.value });
        }
    }

    openNumberForm(user: User): void {
        this.numberForm.setValue({ phoneNumber: user.phoneNumber });
        this.componentStore.setNumberFormOpen(true);
    }
    submitNumberForm(): void {
        if (this.numberForm.valid) {
            this.componentStore.updateNumber({ ...this.numberForm.value });
        }
    }
}
