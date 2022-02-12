import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { IUser } from '../models/user.model';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
    constructor(private authenticationService: AuthenticationService) {}
    get user(): IUser | null {
        const user = localStorage.getItem('user');
        if (user) return JSON.parse(user);
        return null;
    }
    ngOnInit(): void {}
    logout = () => {
        this.authenticationService.logout();
    };
}
