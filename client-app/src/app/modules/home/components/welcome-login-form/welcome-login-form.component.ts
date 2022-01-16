import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-welcome-login-form',
    templateUrl: './welcome-login-form.component.html',
    styleUrls: ['./welcome-login-form.component.scss'],
})
export class WelcomeLoginFormComponent implements OnInit {
    hide: boolean = true;
    constructor() {}

    ngOnInit(): void {}
}
