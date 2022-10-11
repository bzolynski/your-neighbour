import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Localization, User } from '@core/models/';
import { GenericFormControl, GenericFormGroup } from '@core/types/generic-form.type';
import { SettingsAccountStore } from './settings-account.store';
import { selectUser } from '@core/stores/authentication';
import { combineLatest } from 'rxjs';
import { ConfirmationService } from 'primeng/api';

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
    #editingLocalization$ = this.componentStore.editingLocalization$;
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
        combineLatest([
            this.#localizationFormStatus$,
            this.#editingLocalization$,
            this.#nameFormStatus$,
            this.#emailFormStatus$,
            this.#numberFormStatus$,
        ]),
    ]).pipe(
        map(
            ([
                [user, localizations, error, status],
                [localizationFormOpen, nameFormOpen, emailFormOpen, numberFormOpen],
                [localizationFormStatus, editingLocalization, nameFormStatus, emailFormStatus, numberFormStatus],
            ]) => ({
                user,
                localizations: localizations?.filter((x) => !x.isPrimary),
                error,
                status,
                primaryLocalizations: localizations?.filter((x) => x.isPrimary),
                editingLocalization,
                localizationFormOpen,
                localizationFormStatus,
                nameFormOpen,
                nameFormStatus,
                emailFormOpen,
                emailFormStatus,
                numberFormOpen,
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

    localizationForm = new GenericFormGroup({
        id: new GenericFormControl<number>(undefined),
        street: new GenericFormControl<string>('', [Validators.required, Validators.minLength(3)]),
        city: new GenericFormControl<string>('', [Validators.required, Validators.minLength(3)]),
        postCode: new GenericFormControl<string>('', [Validators.required, Validators.minLength(3)]),
        houseNumber: new GenericFormControl<string>('', [Validators.required]),
        flatNumber: new GenericFormControl<string>(''),
    });

    constructor(
        private store: Store,
        protected componentStore: SettingsAccountStore,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit(): void {
        this.componentStore.loadLocalizations();
    }

    onRowEditInit(localization: Localization): void {
        this.componentStore.setLocalizationEditing(true);
        this.localizationForm.patchValue({ ...localization });
    }
    onRowEditSave(localization: Localization): void {
        this.localizationForm.markAllAsTouched();
        if (this.localizationForm.valid) {
            this.componentStore.updateLocalization({ id: localization.id, localization: { ...this.localizationForm.value } });
            this.componentStore.setLocalizationEditing(false);
            this.localizationForm.reset();
        }
    }
    onRowEditCancel(): void {
        this.localizationForm.reset();
        this.componentStore.setLocalizationEditing(false);
    }
    createLocalization(): void {
        this.localizationForm.markAllAsTouched();
        if (this.localizationForm.valid) {
            const localization: Localization = { ...this.localizationForm.value } as Localization;
            this.componentStore.createLocalization(localization);
        }
    }
    deleteLocalization(localization: Localization): void {
        this.confirmationService.confirm({
            message: `Czy na pewno chcesz usunąć tą lokalizację?`,
            header: 'Potwierdź',
            acceptLabel: 'Tak',
            rejectLabel: 'Nie',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.componentStore.deleteLocalization(localization.id);
            },
        });
    }
    openLocalizationForm(): void {
        this.localizationForm.reset();
        this.componentStore.setLocalizationFormOpen(true);
    }
    submitLocalizationForm(): void {
        this.localizationForm.markAllAsTouched();
        if (this.localizationForm.valid) {
            this.componentStore.createLocalization({ ...this.localizationForm.value });
        }
    }

    openNameForm(user: User): void {
        this.nameForm.setValue({ firstName: user.firstName, lastName: user.lastName });
        this.componentStore.setNameFormOpen(true);
    }
    submitNameForm(): void {
        this.nameForm.markAllAsTouched();
        if (this.nameForm.valid) {
            this.componentStore.updateName({ ...this.nameForm.value });
        }
    }

    openEmailForm(user: User): void {
        this.emailForm.setValue({ email: user.email });
        this.componentStore.setEmailFormOpen(true);
    }
    submitEmailForm(): void {
        this.emailForm.markAllAsTouched();
        if (this.emailForm.valid) {
            this.componentStore.updateEmail({ ...this.emailForm.value });
        }
    }

    openNumberForm(user: User): void {
        this.numberForm.setValue({ phoneNumber: user.phoneNumber });
        this.componentStore.setNumberFormOpen(true);
    }
    submitNumberForm(): void {
        this.numberForm.markAllAsTouched();
        if (this.numberForm.valid) {
            this.componentStore.updateNumber({ ...this.numberForm.value });
        }
    }
}
