import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from '@core/models/user.model';
import { Store } from '@ngrx/store';
import { selectUser, signIn, signUp } from '@core/stores/authentication';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DestroyObservable } from 'src/app/shared/utils/destroy-observable';

@Component({
    selector: 'app-welcome',
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.scss'],
    providers: [DestroyObservable],
})
export class WelcomeComponent implements OnInit {
    user$: Observable<User | null> = this.store.select(selectUser);
    selectedIndex: number = 0;
    constructor(private activatedRoute: ActivatedRoute, private destroy$: DestroyObservable, private store: Store) {}

    ngOnInit(): void {
        this.activatedRoute.fragment.pipe(takeUntil(this.destroy$)).subscribe((fragment) => {
            if (fragment) {
                this.selectedIndex = fragment === 'register' ? 1 : 0;
            }
        });
    }

    onLogin = (form: FormGroup) => {
        if (form.valid) {
            this.store.dispatch(signIn({ login: form.get('login')?.value, password: form.get('password')?.value }));
        }
    };

    onRegister = (form: FormGroup) => {
        if (form.valid) {
            const x = {
                email: form.value['email'],
                password: form.value['password'],
                confirmPassword: form.value['confirmPassword'],
            };
            console.log(x);

            this.store.dispatch(
                signUp({
                    email: form.value['email'],
                    password: form.value['password'],
                    confirmPassword: form.value['confirmPassword'],
                })
            );
        }
    };
}
