import { Component } from '@angular/core';
import { AuthenticationStore } from 'src/app/shared/authentication/data-access';

@Component({
    selector: 'app-settings-my',
    templateUrl: './settings-my.component.html',
    styleUrls: ['./settings-my.component.scss'],
})
export class SettingsMyComponent {
    user$ = this.authStore.user$;

    constructor(private authStore: AuthenticationStore) {}
}
