import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { map } from 'rxjs/operators';
import { Localization } from '@models/';
import { DestroyObservable } from '@utils/destroy-observable';
import { GenericFormControl, GenericFormGroup } from '@app-types/generic-form.type';
import { SettingsAccountStore } from './settings-account.store';
import { selectUser } from '@stores/authentication';
import { combineLatest } from 'rxjs';

@Component({
    selector: 'app-settings-account',
    templateUrl: './settings-account.component.html',
    styleUrls: ['./settings-account.component.scss'],
    providers: [DestroyObservable],
})
export class SettingsAccountComponent implements OnInit {
    #user$ = this.store.select(selectUser);
    #localizations$ = this.componentStore.localizations$.pipe();
    #error$ = this.componentStore.error$;
    #status$ = this.componentStore.status$;

    vm$ = combineLatest([this.#user$, this.#localizations$, this.#error$, this.#status$]).pipe(
        map(([user, localizations, error, status]) => ({
            user,
            localizations: localizations?.filter((x) => !x.isPrimary),
            error,
            status,
            primaryLocalizations: localizations?.filter((x) => x.isPrimary),
        }))
    );

    form = new GenericFormGroup({
        id: new GenericFormControl<number>(undefined),
        street: new GenericFormControl<string>('', [Validators.required, Validators.minLength(3)]),
        city: new GenericFormControl<string>('', [Validators.required, Validators.minLength(3)]),
        postCode: new GenericFormControl<string>('', [Validators.required, Validators.minLength(3)]),
        houseNumber: new GenericFormControl<string>('', [Validators.required]),
        flatNumber: new GenericFormControl<string>(''),
    });
    onRowEditInit(localization: Localization): void {
        this.form.patchValue({ ...localization });
    }
    onRowEditSave(localization: Localization): void {
        this.componentStore.updateLocalization({ id: localization.id, localization: { ...this.form.value } });
    }
    onRowEditCancel(localization: Localization, index: number): void {
        this.form.reset();
    }

    constructor(
        private store: Store,
        private componentStore: SettingsAccountStore,
        public dialog: MatDialog,
        private destroy$: DestroyObservable,
        private messageService: MessageService,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.componentStore.loadLocalizations();
    }
    localizationFormSubmited = (id: number | undefined, form: FormGroup) => {
        if (form.valid) {
            const localization: Localization = { ...form.value } as Localization;
            if (id) this.componentStore.updateLocalization({ id: id, localization: localization });
            else this.componentStore.createLocalization(localization);
            this.dialog.closeAll();
        }
    };
    deleteLocalization = (id: number) => {
        this.componentStore.deleteLocalization(id);
    };
    setPrimaryLocalization = (id: number) => {
        this.componentStore.setPrimaryLocalization(id);
    };
}
