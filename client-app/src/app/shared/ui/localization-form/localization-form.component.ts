import { Component, Input, Output } from '@angular/core';
import { Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { ICoordinates, ILocalization } from '../../data-access/models';
import { GenericFormControl, GenericFormGroup } from '../../utils';

@Component({
    selector: 'app-localization-form',
    templateUrl: './localization-form.component.html',
    styleUrls: ['./localization-form.component.scss'],
})
export class LocalizationFormComponent {
    @Output() localizationSubmited = new Subject<ILocalization>();
    @Output() cancelButtonPressed = new Subject();
    @Input() set localization(value: ILocalization | null) {
        if (value) {
            this.form.patchValue({ name: value.name, coordinates: value.coordinates });
        }
    }
    form = new GenericFormGroup({
        name: new GenericFormControl<string>('', [Validators.required, Validators.minLength(3)]),
        coordinates: new GenericFormControl<ICoordinates>(),
    });

    get nameErrorMessage() {
        const control = this.form.controls['name'];
        if (control.errors?.required) return 'Pole jest wymagane!';
        if (control.errors?.minlength) return `Minimalna długość: ${control.errors?.minlength?.requiredLength}`;

        return '';
    }
    handleSubmit = () => {
        this.localizationSubmited.next({ ...this.form.value });
    };
}
