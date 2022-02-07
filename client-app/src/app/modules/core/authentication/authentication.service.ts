import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ObservableResponse } from '../types';
import { AuthenticationApiService } from './authentication-api.service';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {
    constructor(
        private authenticationApiService: AuthenticationApiService,
        private router: Router
    ) {}

    login = (login: string, password: string): void => {
        this.authenticationApiService.login(login, password).subscribe(
            (response) => {
                this.router.navigate(['../']);
            },
            (error) => {}
        );
    };
    refreshToken = (): ObservableResponse<boolean> => {
        return this.authenticationApiService.refresh();
    };
}
