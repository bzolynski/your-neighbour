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
    get currentUser(): IUser | undefined {
        const jsonUser = localStorage.getItem('user');
        if (jsonUser) return JSON.parse(jsonUser);
        return undefined;
    }
    currentUserChanged: ReplaySubject<IUser | null> = new ReplaySubject<IUser | null>(1);
    /*
    getCurrentUser = (): ObservableResponse<IUser> => {
        return this.authenticationApiService.getCurrentUser().pipe(
            map((value) => {
                this.currentUserChanged.next(value.responseObject);
                this.saveUserToLocalstorage(value.responseObject);
                return value;
            })
        );
    };
    */
    login = (login: string, password: string): ObservableResponse<IUser> => {
        return this.authenticationApiService.login(login, password).pipe(
            map((response) => {
                this.currentUserChanged.next(response.responseObject);
                this.saveUserToLocalstorage(response.responseObject);
                return response;
            })
        );
    };

    logout = (): ObservableResponse<boolean> => {
        this.currentUserChanged.next(null);
        this.removeUserFromLocalstorage();
        return this.authenticationApiService.logout();
    };

    refreshToken = (): ObservableResponse<boolean> => {
        return this.authenticationApiService.refresh();
    };

    register = (register: IRegister): ObservableResponse<boolean> => {
        return this.authenticationApiService.register(register);
    };

    saveUserToLocalstorage = (user: IUser) => {
        localStorage.setItem('user', JSON.stringify(user));
    };
    removeUserFromLocalstorage = () => {
        localStorage.removeItem('user');
    };
}
