import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';
import { IUser } from '../models/user.model';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
    constructor(
        private authenticationService: AuthenticationService,
        private router: Router
    ) {}
    get user(): IUser | null {
        const user = localStorage.getItem('user');
        if (user) return JSON.parse(user);
        return null;
    }
    logout = () => {
        this.authenticationService.logout().subscribe((response) => {
            this.router.navigateByUrl('welcome');
        });
    };
}
