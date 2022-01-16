import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-welcome-register-form',
    templateUrl: './welcome-register-form.component.html',
    styleUrls: ['./welcome-register-form.component.scss'],
})
export class WelcomeRegisterFormComponent implements OnInit {
    // Public properties
    form: FormGroup = this.fb.group({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required]),
        repeatPassword: new FormControl('', [Validators.required]),
    });

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
    get repeatPasswordErrorMessage(): string {
        const repeatPasswordControl = this.form.controls['repeatPassword'];
        if (repeatPasswordControl.errors?.required) return 'Pole jest wymagane';
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
