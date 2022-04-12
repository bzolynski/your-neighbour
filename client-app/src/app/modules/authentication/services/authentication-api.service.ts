import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpError } from '../../core/models';
import { IRegister } from '../../core/models/authentication.model';
import { IUser } from '../../core/models/user.model';
import { ObservableResponse } from '../../core/types';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationApiService {
    constructor(private client: HttpClient) {}

    private handleError = (httpError: HttpError<Response>, caught: Observable<any>) => {
        // for ex: logs
        console.log(httpError);

        return throwError(httpError);
    };

    getCurrentUser = (): ObservableResponse<IUser> => {
        return this.client
            .get<Observable<IUser>>(`${environment.authentiaction_api_url}/authentication/get-current-user`)
            .pipe(catchError(this.handleError));
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

    refresh = (): ObservableResponse<boolean> => {
        return this.client
            .post<ObservableResponse<boolean>>(`${environment.authentiaction_api_url}/authentication/refresh`, {})
            .pipe(catchError(this.handleError));
    };

    register = (register: IRegister): ObservableResponse<boolean> => {
        return this.client
            .post<ObservableResponse<boolean>>(`${environment.authentiaction_api_url}/authentication/register`, register)
            .pipe(catchError(this.handleError));
    };
}
