import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { User } from '@models/';
import { GenericFormControl, GenericFormGroup } from 'src/app/shared/utils';
import { loadUser, selectError, selectStatus, selectUser, updateUser } from '../../data-access/store/settings-my-account-form';

@Component({
    selector: 'app-settings-my-account-form',
    templateUrl: './settings-my-account-form.component.html',
    styleUrls: ['./settings-my-account-form.component.scss'],
})
export class SettingsMyAccountFormComponent implements OnInit {
    form = new GenericFormGroup({
        firstName: new GenericFormControl<string>('', [Validators.required]),
        lastName: new GenericFormControl<string>('', [Validators.required]),
        phoneNumber: new GenericFormControl<string>('', [Validators.required]),
    });

    get firstNameErrorMessage() {
        const control = this.form.controls['firstName'];
        if (control.errors?.required) return 'Pole jest wymagane';
        return '';
    }
    get lastNameErrorMessage() {
        const control = this.form.controls['lastName'];
        if (control.errors?.required) return 'Pole jest wymagane';
        return '';
    }
    get phoneNumberErrorMessage() {
        const control = this.form.controls['phoneNumber'];
        if (control.errors?.required) return 'Pole jest wymagane';
        return '';
    }

    user$ = this.store.select(selectUser).pipe(
        filter((user): user is User => user !== null),
        tap((user) => this.form.patchValue({ firstName: user.firstName, lastName: user.lastName, phoneNumber: user.phoneNumber }))
    );
    error$ = this.store.select(selectError);
    status$ = this.store.select(selectStatus);

    vm$ = combineLatest([this.user$, this.error$, this.status$]).pipe(map(([user, error, status]) => ({ user, error, status })));

    constructor(private store: Store) {}

    ngOnInit(): void {
        this.store.dispatch(loadUser());
    }

    submitForm = (id: number) => {
        this.store.dispatch(updateUser({ id: id, user: { ...this.form.value } }));
    };
}
