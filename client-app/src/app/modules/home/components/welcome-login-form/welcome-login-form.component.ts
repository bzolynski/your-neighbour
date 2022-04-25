import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { MessageService } from 'src/app/modules/core/services/message.service';
import { AuthenticationStore } from 'src/app/shared/authentication/data-access';
@Component({
    selector: 'app-welcome-login-form',
    templateUrl: './welcome-login-form.component.html',
    styleUrls: ['./welcome-login-form.component.scss'],
})
export class WelcomeLoginFormComponent {
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

    user$ = this.authenticationStore.user$.pipe(
        tap((user) => {
            if (user) this.router.navigateByUrl(this.activatedRoute.snapshot.queryParams['returnUrl'] ?? '/');
        })
    );
    isBusy$ = this.authenticationStore.isLoading$;
    error$ = this.authenticationStore.error$.pipe(tap((error) => this.messageService.showMessage(error, 'error')));

    constructor(
        private messageService: MessageService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private authenticationStore: AuthenticationStore
    ) {}

    onSubmit = () => {
        if (this.form.valid) {
            this.authenticationStore.signIn({ login: this.form.get('login')?.value, password: this.form.get('password')?.value });
        }
    };
}
