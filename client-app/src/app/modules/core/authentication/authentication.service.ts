import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { IUser } from '../models/user.model';
import { ObservableResponse } from '../types';
import { AuthenticationApiService } from './authentication-api.service';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {
    constructor(private authenticationApiService: AuthenticationApiService) {}

    login = (login: string, password: string): ObservableResponse<IUser> => {
        return this.authenticationApiService.login(login, password).pipe(
            map((response) => {
                localStorage.setItem(
                    'user',
                    JSON.stringify(response.responseObject)
                );
                return response;
            })
        );
    };

    logout = (): ObservableResponse<boolean> => {
        localStorage.removeItem('user');
        return this.authenticationApiService.logout();
    };

    refreshToken = (): ObservableResponse<boolean> => {
        return this.authenticationApiService.refresh();
    };
}
