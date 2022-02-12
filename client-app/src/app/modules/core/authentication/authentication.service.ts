import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpError, Response } from '../models';
import { MessageService } from '../services/message.service';
import { ObservableResponse } from '../types';
import { AuthenticationApiService } from './authentication-api.service';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {
    constructor(
        private authenticationApiService: AuthenticationApiService,
        private messageService: MessageService,
        private router: Router
    ) {}

    private handleError = (
        httpError: HttpError<Response>,
        caught: Observable<any>
    ) => {
        this.messageService.showMessage(
            httpError.error?.errorMessages[0] ?? httpError.message,
            'error'
        );
        // for ex: logs
        console.log(httpError);

        return throwError(httpError);
    };

    login = (login: string, password: string): void => {
        this.authenticationApiService
            .login(login, password)
            .pipe(catchError(this.handleError))
            .subscribe((response) => {
                localStorage.setItem(
                    'user',
                    JSON.stringify(response.responseObject)
                );
                this.router.navigate(['../']);
            });
    };

    logout = (): void => {
        localStorage.removeItem('user');
        this.authenticationApiService
            .logout()
            .pipe(catchError(this.handleError))
            .subscribe((response) => {
                this.router.navigateByUrl('welcome');
            });
    };

    refreshToken = (): ObservableResponse<boolean> => {
        return this.authenticationApiService
            .refresh()
            .pipe(catchError(this.handleError));
    };
}
