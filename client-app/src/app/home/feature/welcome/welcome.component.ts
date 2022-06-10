import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { AuthenticationStore } from 'src/app/shared/authentication/data-access';
import { DestroyObservable } from 'src/app/shared/utils/destroy-observable';

@Component({
    selector: 'app-welcome',
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.scss'],
    providers: [DestroyObservable],
})
export class WelcomeComponent implements OnInit {
    selectedIndex: number = 0;
    isBusy$ = this.authenticationStore.isLoading$;
    constructor(
        private activatedRoute: ActivatedRoute,
        private destroy$: DestroyObservable,
        private authenticationStore: AuthenticationStore
    ) {}

    ngOnInit(): void {
        this.activatedRoute.fragment.pipe(takeUntil(this.destroy$)).subscribe((fragment) => {
            if (fragment) {
                this.selectedIndex = fragment === 'register' ? 1 : 0;
            }
        });
    }

    onLogin = (form: FormGroup) => {
        if (form.valid) {
            this.authenticationStore.signIn({ login: form.get('login')?.value, password: form.get('password')?.value });
        }
    };

    onRegister = (form: FormGroup) => {
        if (form.valid) {
            this.authenticationStore.register({ ...form.value });
        }
    };
}
