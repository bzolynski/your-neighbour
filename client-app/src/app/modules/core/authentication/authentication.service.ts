import { Injectable } from '@angular/core';
import { IRegister } from '../models/authentication.model';
import { IUser } from '../models/user.model';
import { ObservableResponse } from '../types';
import { AuthenticationApiService } from './authentication-api.service';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {
    constructor(private authenticationApiService: AuthenticationApiService) {}

    login = (login: string, password: string): ObservableResponse<IUser> => {
        return this.authenticationApiService.login(login, password);
    };

    logout = (): ObservableResponse<boolean> => {
        return this.authenticationApiService.logout();
    };

    refreshToken = (): ObservableResponse<boolean> => {
        return this.authenticationApiService.refresh();
    };

    register = (register: IRegister): ObservableResponse<boolean> => {
        return this.authenticationApiService.register(register);
    };
}
