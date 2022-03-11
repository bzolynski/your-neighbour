import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthenticationService } from 'src/app/modules/core/authentication/authentication.service';

@Component({
    selector: 'app-welcome-login-form',
    templateUrl: './welcome-login-form.component.html',
    styleUrls: ['./welcome-login-form.component.scss'],
})
export class WelcomeLoginFormComponent implements OnDestroy {
    // Public properties
    form: FormGroup = new FormGroup({
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

    constructor(
        private authenticationService: AuthenticationService,
        private router: Router
    ) {}
    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe;
    }

    onSubmit = () => {
        if (this.form.valid) {
            this.authenticationService
                .login(
                    this.form.get('login')?.value,
                    this.form.get('password')?.value
                )
                .subscribe((response) => {
                    this.router.navigate(['../']);
                });
        }
    };
}
