import { Component } from '@angular/core';
import { AuthenticationService } from './modules/core/authentication/authentication.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'client-app';
    constructor(authenticationService: AuthenticationService) {
        authenticationService.getCurrentUser();
    }
}
