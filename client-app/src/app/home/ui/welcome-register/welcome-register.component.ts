import { Component, Output } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { GenericFormControl } from '@core/types/.';
import { FormGroupValidators } from 'src/app/shared/validators';

@Component({
    selector: 'app-welcome-register',
    templateUrl: './welcome-register.component.html',
    styleUrls: ['./welcome-register.component.scss'],
})
export class WelcomeRegisterComponent {
    @Output() formSubmited = new Subject<FormGroup>();
    form: FormGroup = new FormGroup(
        {
            email: new GenericFormControl('', [Validators.required, Validators.email]),
            password: new GenericFormControl('', [Validators.required]),
            confirmPassword: new GenericFormControl('', [Validators.required]),
        },
        [FormGroupValidators.checkEqual('confirmPassword', ['password'])]
    );

    get emailErrorMessage(): string {
        const loginControl = this.form.controls['email'];
        if (loginControl.errors?.required) return 'Pole jest wymagane';
        if (loginControl.errors?.email) return 'Niepoprawny adres email';
        return '';
    }
    get passwordErrorMessage(): string {
        const passwordControl = this.form.controls['password'];
        if (passwordControl.errors?.required) return 'Pole jest wymagane';
        return '';
    }
    get confirmPasswordErrorMessage(): string {
        const confirmPasswordControl = this.form.controls['confirmPassword'];
        if (confirmPasswordControl.errors?.required) return 'Pole jest wymagane';
        if (confirmPasswordControl.errors?.notEqual) return 'Podane hasła nie są takie same';
        return '';
    }
}
