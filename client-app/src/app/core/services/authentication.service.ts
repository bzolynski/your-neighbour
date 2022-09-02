import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '@models/';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {
    constructor(private client: HttpClient) {}

    private handleError = (httpError: HttpErrorResponse, caught: Observable<any>) => {
        // for ex: logs
        //console.log(httpError);

        return throwError(httpError);
    };

    login = (login: string, password: string): Observable<User> => {
        return this.client
            .post<Observable<User>>(`${environment.authentiaction_api_url}/authentication/login`, {
                login: login,
                password: password,
            })
            .pipe(catchError(this.handleError));
    };

    logout = (): Observable<boolean> => {
        return this.client
            .post<Observable<boolean>>(`${environment.authentiaction_api_url}/authentication/logout`, {})
            .pipe(catchError(this.handleError));
    };

    refreshToken = (): Observable<boolean> => {
        return this.client
            .post<Observable<boolean>>(`${environment.authentiaction_api_url}/authentication/refresh`, {})
            .pipe(catchError(this.handleError));
    };

    register = (register: { email: string; password: string; confirmPassword: string }): Observable<boolean> => {
        return this.client
            .post<Observable<boolean>>(`${environment.authentiaction_api_url}/authentication/register`, register)
            .pipe(catchError(this.handleError));
    };
}
