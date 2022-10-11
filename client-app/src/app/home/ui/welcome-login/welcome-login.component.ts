import { Component, Output } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { GenericFormControl } from '@core/types/.';
@Component({
    selector: 'app-welcome-login',
    templateUrl: './welcome-login.component.html',
    styleUrls: ['./welcome-login.component.scss'],
})
export class WelcomeLoginComponent {
    @Output() formSubmited = new Subject<FormGroup>();

    form: FormGroup = new FormGroup({
        login: new GenericFormControl('', [Validators.required]),
        password: new GenericFormControl('', [Validators.required]),
    });

    get loginErrorMessage(): string {
        const loginControl = this.form.controls['login'];
        if (loginControl.errors?.required) return 'Pole jest wymagane';
        return '';
    }
    get passwordErrorMessage(): string {
        const passwordControl = this.form.controls['password'];
        if (passwordControl.errors?.required) return 'Pole jest wymagane';
        return '';
    }
}
