import { Injectable } from '@angular/core';
import { IRegister } from '../../core/models/authentication.model';
import { IUser } from '../../core/models/user.model';
import { ObservableResponse } from '../../core/types';
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
