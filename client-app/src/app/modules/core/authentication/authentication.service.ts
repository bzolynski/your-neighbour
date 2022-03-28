import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { IRegister } from '../models/authentication.model';
import { IUser } from '../models/user.model';
import { ObservableResponse } from '../types';
import { AuthenticationApiService } from './authentication-api.service';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {
    constructor(private authenticationApiService: AuthenticationApiService) {}
    currentUser: ReplaySubject<IUser | null> = new ReplaySubject<IUser | null>(1);

    getCurrentUser = (): void => {
        this.authenticationApiService.getCurrentUser().subscribe((response) => {
            this.currentUser.next(response.responseObject);
        });
    };

    login = (login: string, password: string): ObservableResponse<IUser> => {
        return this.authenticationApiService.login(login, password).pipe(
            map((response) => {
                this.currentUser.next(response.responseObject);
                return response;
            })
        );
    };

    logout = (): ObservableResponse<boolean> => {
        this.currentUser.next(null);
        return this.authenticationApiService.logout();
    };

    refreshToken = (): ObservableResponse<boolean> => {
        return this.authenticationApiService.refresh();
    };

    register = (register: IRegister): ObservableResponse<boolean> => {
        return this.authenticationApiService.register(register);
    };
}
