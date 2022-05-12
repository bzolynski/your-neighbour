import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { MessageService } from 'src/app/modules/core/services/message.service';
import { FormGroupValidators } from 'src/app/shared/validators';

@Component({
    selector: 'app-welcome-register-form',
    templateUrl: './welcome-register-form.component.html',
    styleUrls: ['./welcome-register-form.component.scss'],
})
export class WelcomeRegisterFormComponent implements OnDestroy {
    // Public properties
    form: FormGroup = new FormGroup(
        {
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required]),
            confirmPassword: new FormControl('', [Validators.required]),
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

    // Private members
    destroy$: Subject<boolean> = new Subject<boolean>();

    constructor(/*private authenticationService: AuthenticationService, */ private messageService: MessageService) {}
    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe;
    }

    onSubmit = () => {
        throw new Error('Implement this with ngrx');
        /*console.log(this.form.valid);

        if (this.form.valid) {
            const register: IRegister = Object.assign(this.form.value);
            this.authenticationService.register(register).subscribe(
                (response) => {
                    console.log(response);
                },
                (error: HttpErrorResponse) => {
                    this.messageService.showMessage(error.message, 'error');
                }
            );
        }*/
    };
}
