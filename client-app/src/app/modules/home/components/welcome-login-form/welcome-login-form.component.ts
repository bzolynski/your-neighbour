import { Component, OnDestroy, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-welcome-login-form',
    templateUrl: './welcome-login-form.component.html',
    styleUrls: ['./welcome-login-form.component.scss'],
})
export class WelcomeLoginFormComponent implements OnInit, OnDestroy {
    // Public properties
    form: FormGroup = this.fb.group({
        login: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
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

    // Private members
    destroy$: Subject<boolean> = new Subject<boolean>();

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {}

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe;
    }

    onSubmit = () => {
        console.log(this.form.value);
    };
}
