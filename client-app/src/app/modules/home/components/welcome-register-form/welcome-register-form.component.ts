import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { Subject } from 'rxjs';
import { FormGroupValidators } from 'src/app/modules/shared/validators';

@Component({
    selector: 'app-welcome-register-form',
    templateUrl: './welcome-register-form.component.html',
    styleUrls: ['./welcome-register-form.component.scss'],
})
export class WelcomeRegisterFormComponent implements OnInit {
    // Public properties
    form: FormGroup = this.fb.group(
        {
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required]),
            confirmPassword: new FormControl('', [Validators.required]),
        },
        {
            validator: Validators.compose([
                FormGroupValidators.checkEqual('confirmPassword', ['password']),
            ]),
        }
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
        if (confirmPasswordControl.errors?.required)
            return 'Pole jest wymagane';
        if (confirmPasswordControl.errors?.notEqual)
            return 'Podane hasła nie są takie same';
        return '';
    }

    // Private members
    destroy$: Subject<boolean> = new Subject<boolean>();

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {}

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe;
    }

    onSubmit = () => {};
}
