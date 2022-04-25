import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpError } from 'src/app/modules/core/models';
import { ObservableResponse } from 'src/app/shared/data-access/models';
import { IUser } from 'src/app/shared/data-access/models/api/user';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {
    constructor(private client: HttpClient) {}

    private handleError = (httpError: HttpError<Response>, caught: Observable<any>) => {
        // for ex: logs
        console.log(httpError);

        return throwError(httpError);
    };

    login = (login: string, password: string): ObservableResponse<IUser> => {
        return this.client
            .post<ObservableResponse<IUser>>(`${environment.authentiaction_api_url}/authentication/login`, {
                login: login,
                password: password,
            })
            .pipe(catchError(this.handleError));
    };

    logout = (): ObservableResponse<boolean> => {
        return this.client
            .post<ObservableResponse<boolean>>(`${environment.authentiaction_api_url}/authentication/logout`, {})
            .pipe(catchError(this.handleError));
    };

    refreshToken = (): ObservableResponse<boolean> => {
        return this.client
            .post<ObservableResponse<boolean>>(`${environment.authentiaction_api_url}/authentication/refresh`, {})
            .pipe(catchError(this.handleError));
    };

    register = (register: { email: string; password: string; confirmPassword: string }): ObservableResponse<boolean> => {
        return this.client
            .post<ObservableResponse<boolean>>(`${environment.authentiaction_api_url}/authentication/register`, register)
            .pipe(catchError(this.handleError));
    };
}
