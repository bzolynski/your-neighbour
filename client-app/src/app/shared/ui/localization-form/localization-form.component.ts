import { Component, Input, Output } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Localization } from '@models/';
import { GenericFormControl, GenericFormGroup } from '../../utils';

@Component({
    selector: 'app-localization-form',
    templateUrl: './localization-form.component.html',
    styleUrls: ['./localization-form.component.scss'],
})
export class LocalizationFormComponent {
    @Output() formSubmited = new Subject<FormGroup>();
    @Output() canceled = new Subject();
    @Input() set localization(value: Localization | null) {
        if (value) {
            this.form.patchValue({ ...value });
        }
    }
    form = new GenericFormGroup({
        name: new GenericFormControl<string>('', [Validators.required, Validators.minLength(3)]),
        street: new GenericFormControl<string>('', [Validators.required, Validators.minLength(3)]),
        city: new GenericFormControl<string>('', [Validators.required, Validators.minLength(3)]),
        postCode: new GenericFormControl<string>('', [Validators.required, Validators.minLength(3)]),
        houseNumber: new GenericFormControl<string>('', [Validators.required]),
        flatNumber: new GenericFormControl<string>(''),
    });

    get nameErrorMessage() {
        const control = this.form.controls['name'];
        if (control.errors?.required) return 'Pole jest wymagane!';
        if (control.errors?.minlength) return `Minimalna długość: ${control.errors?.minlength?.requiredLength}`;

        return '';
    }
}
